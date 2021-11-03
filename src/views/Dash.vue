<template>
  <div class="dash">
    {{}}
    <div class="numbers">
      <DashNumber :num=total_maint name="Total de Manutenções"/>
      <DashNumber :num=gCost name="Gasto total com Manutenções"/>
      <DashNumber :num=maint_agendadas_num name="Manutenções Agendadas"/>
      <DashNumber :num=maint_delayed_num name="Manutenções Atrasadas"/>
      <DashNumber :num=big_cost_num name="Maior Gasto com Manutenção"/>
    </div>
    <div class="graphs">
      <apexchart type="radialBar" ref="chart5cars" height="370" width="100%" :options="chartOptions" :series="fiveCars"></apexchart>
      <apexchart type="bar" ref="chartWeekCoast" width="100%" height="350" :options="chartOptions2" :series="costsWeeks"></apexchart>
      <apexchart type="bar" ref="chartWeekType" width="100%" height="350" :options="chartOptions3" :series="manWeeks"></apexchart>
      <apexchart type="area" ref="chartWeekManTp" width="100%" height="350" :options="chartOptions4" :series="manNames"></apexchart>
      <apexchart type="area" ref="chartWeekManTpNum" width="100%" height="350" :options="chartOptions5" :series="manNamesNum"></apexchart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DashNumber from '@/components/DashNumber.vue'
import store from '../store'
import axios from 'axios';
import { computed } from '@vue/reactivity'
import VueApexCharts from "vue3-apexcharts";
import { ref } from 'vue'

export default {
  name: 'Home',
  components: {
    DashNumber,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      Maintenances: '',
      MaintenancesUp: '',
      MaintenancesDelayed: '',
      MaintenancesOnTime: '',
      MaintenancesWarning: '',
      total_maint: '',
      maint_agendadas_num: '',
      maint_delayed_num: '',
      big_cost_num: 0,
      fiveCars: [],
      fiveCarsSum: 0,
      fiveCarsName: [],
      gCost: 0,
      showCars: false,
      dayWeek: 0,
      daysNum: 16,
      daysStr: [],
      weeks: [],
      costsWeeks: [],
      manWeeks: [],
      manNames: [],
      manNamesNum: [],
          chartOptions: {
            chart: {
              height: 370,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: '22px',
                  },
                  value: {
                    fontSize: '16px',
                    formatter: (val) => {
                      return ((val*this.fiveCarsSum)/100).toFixed(2)
                    }
                  },
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: () => {
                      // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                      return this.fiveCarsSum
                    }
                  }
                }
              }
            },
            labels: [],
            title: {
              text: 'Gasto total por veículo',
              floating: true,
              align: 'center',
              offsetY: 330,
              style: {
                color: '#444'
              }
            },
          },
      chartOptions2: {
            chart: {
              height: 350,
              type: 'bar',
            },
            dataLabels: {
              enabled: false,
            },
            
            xaxis: {
              categories: [],
              position: 'top',
            },
            title: {
              text: 'Gastos com manutenção por semana',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
      },
      chartOptions3: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            title: {
              text: 'Tipos de manutenção por semana',
              floating: true,
              align: 'left',
              style: {
                color: '#444'
              }
            }
          },
      chartOptions4: {
            chart: {
              height: 350,
              type: 'area'
            },
            responsive: [{
              breakpoint: 1500,
              options: {width: 250},
            }],
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Custos de manutenção por item semanal',
              floating: true,
              align: 'left',
              style: {
                color: '#444'
              }
            }
          },
      chartOptions5: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Números de manutenções por itens semanal',
              floating: true,
              align: 'left',
              style: {
                color: '#444'
              }
            }
          },
    }
  },
  methods: {
    getMan() {
      const headers = {
        'cobli-api-key': this.ApiKey,
      }
      axios
        .get("https://backend-app-challenge-jvbfelix.vercel.app/manutencao",{
          headers:headers,
        })
        .then((res) => {
          this.getDay()
          this.Maintenances = res.data['pastMaintenancesById']
          this.total_maint = Object.keys(this.Maintenances).length
          let manType = []
          let manTypeP = []
          let manTypeC = []
          let manCost = []
          let car = []
          let manNames = []
          let manNamesData = []
          this.gCost = 0
          for(let i = 0; i < this.daysNum; i++){
              manCost[i] = 0
              manTypeP[i] = 0
              manTypeC[i] = 0
            }
          for (let i in this.Maintenances){
            let time = this.Maintenances[i]['maintenance_time']
            let type = this.Maintenances[i]['maintenance_type']
            let custo = 0
            for (let j in this.Maintenances[i]['items']){
              try{
                let c = this.Maintenances[i]['items'][j]['item_price']
                let name = this.Maintenances[i]['items'][j]['item_name'].value
                if (typeof c === 'undefined'){
                  c = 0
                }
                if(!manNames.includes(name)){
                  manNames.push(name)
                  manNamesData.push({name,time,custo:c})
                } else {
                  manNamesData.push({name,time,custo:c})
                }
                custo += parseFloat(c)
              } catch {
                continue
              }
            }
            this.gCost += custo
            if (this.big_cost_num < custo) {
              this.big_cost_num = custo
            }
            let c = car[this.Maintenances[i]['vehicle_id']]
            if (c == undefined || isNaN(c)){
              car[this.Maintenances[i]['vehicle_id']] = 0
            }
            car[this.Maintenances[i]['vehicle_id']] += custo
            manType.push({time, type})
            for(let i = 0; i < this.daysNum; i++){
              const date = new Date(time)
              if (date <= this.weeks[i] && date >= this.weeks[i+1]){
                manCost[i] += custo
                for (let j in type){
                  if(type[j] == 'preventive'){
                    manTypeP[i]++
                  }else if(type[j] == 'corrective'){
                    manTypeC[i]++
                  }
                }
              }
            }
          }
          let CharManNameData = []
          let ChartWeekManTpNum = []
          for(let i in manNames){
            let temp = []
            let temp2 = []
            let use = false
            for(let j = 0; j < this.daysNum; j++){
              temp[j] = 0
              temp2[j] = 0
            }
            for(let j in manNamesData){
              if(manNamesData[j].name == manNames[i]){
                for(let k = 0; k < this.daysNum; k++){
                  const date = new Date(manNamesData[j].time)
                  if (date <= this.weeks[k] && date >= this.weeks[k+1]){
                    temp[k] += manNamesData[j].custo
                    temp2[k]++
                    use = true
                  }
                }
              }
            }
            if(use){
              CharManNameData.push({
                name: manNames[i],
                data: temp.reverse()})
              ChartWeekManTpNum.push({
                name: manNames[i],
                data: temp2.reverse()})
            }
            
          }
          this.manNames = CharManNameData
          this.manNamesNum = ChartWeekManTpNum
          this.costsWeeks = [{
            name: 'Gasto com Manutenção',
            data: manCost.reverse()
          }]
          this.manWeeks = [{
            name: 'Preventiva',
            data: manTypeP.reverse()
          }, {
            name: 'Corretiva',
            data: manTypeC.reverse()
          }]
          this.ret5car(car)
        }).catch((err) => {
          console.log(err)
          alert("Erro ao validar a chave, favor verificar e tentar novamente")
        })
    },
    getManAgenda() {
      const headers = {
        'cobli-api-key': this.ApiKey,
      }
      axios
        .get("https://backend-app-challenge-jvbfelix.vercel.app/upcoming",{
          headers:headers,
        })
        .then((res) => {
          this.MaintenancesDelayed = res.data['delayed']
          this.maint_delayed_num = Object.keys(this.MaintenancesDelayed).length
          this.MaintenancesOnTime = res.data['onTime']
          this.MaintenancesWarning = res.data['warning']
          this.maint_agendadas_num = Object.keys(this.MaintenancesOnTime).length + Object.keys(this.MaintenancesWarning).length
        }).catch((err) => {
          console.log(err)
          alert("Erro ao validar a chave, favor verificar e tentar novamente")
        })
    },
    ret5car(car){
      let val = []
      for(let i in car){
        val.push({id: i , cost: parseFloat(car[i])})
      }
      val = val.sort((a,b) => {
        return b.cost - a.cost;
      })
      if(val.length > 5){
        val = val.slice(0,5)
      }
      this.fiveCars = []
      this.fiveCarsName = []
      this.fiveCarsSum = 0
      this.showCars = false
      for(let i in val){
        this.fiveCarsSum += val[i].cost
      }
      this.fiveCarsSum = this.fiveCarsSum.toFixed(2)
      for(let i in val){
        this.fiveCars.push((val[i].cost/this.fiveCarsSum)*100)
        this.fiveCarsName.push(val[i].id)
      }
      this.fiveCarsName = Object.values(this.fiveCarsName)


      const headers = {
        'cobli-api-key': this.ApiKey,
      }
      axios
        .get("https://backend-app-challenge-jvbfelix.vercel.app/devices",{
          headers:headers,
        })
        .then((res) => {
          let names = []
          for (let c in res.data.devices){
            const id = res.data.devices[c].vehicle.vehicle_id
            const name = res.data.devices[c].vehicle.model + " , " + res.data.devices[c].vehicle.license_plate
            names.push({id,name})
          }
          let newNames = []
          const ids = Object.values(this.fiveCarsName)
          for (let i in ids){
            for (let j in names){
              if( names[j].id === ids[i]){
                  newNames.push(names[j].name)
                }
            }
          }
          this.fiveCarsName = newNames
          this.chart5cars.updateOptions({ labels: this.fiveCarsName, });
        }).catch((err) => {
          console.log(err)
          alert("Erro ao validar a chave, favor verificar e tentar novamente")
        })
      this.fiveCars = Object.values(this.fiveCars)
      this.showCars = true
      this.chart5cars.updateOptions({ labels: this.fiveCarsName, });
    },
    getDay(){
      const now = new Date
      this.dayWeek = now.getDay()
      now.setDate(now.getDate() - now.getDay())
      let dates= []
      for(let i = 0; i < this.daysNum+1; i++){
        dates.push(new Date(now))
        this.daysStr.push(now.getDate().toString() + "/" + now.getMonth().toString())
        now.setDate(now.getDate() - 7)
      }
      this.chartWeekCoast.updateOptions({ xaxis: {categories:this.daysStr.reverse(), } });
      this.chartWeekType.updateOptions({ xaxis: {categories:this.daysStr.reverse(), } });
      this.chartWeekManTp.updateOptions({ xaxis: {categories:this.daysStr.reverse(), } });
      this.chartWeekManTpNum.updateOptions({ xaxis: {categories:this.daysStr.reverse(), } });
      this.weeks = dates
    }
  },
  setup() {
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    const ApiKey = computed(() => store.getters.ApiKey)
    const chart5cars = ref(null)
    const chartWeekType = ref(null)
    const chartWeekCoast = ref(null)
    const chartWeekManTp = ref(null)
    const chartWeekManTpNum = ref(null)
    return {
      isAuthenticated,
      ApiKey,
      chart5cars,
      chartWeekType,
      chartWeekCoast,
      chartWeekManTp,
      chartWeekManTpNum
    }
  },
  mounted() {
    if(!this.isAuthenticated) {
      this.$router.push('/')
    } else {
      concole.log("Autenticado")
      this.getMan()
      this.getManAgenda()
    }
  }
}
</script>

<style lang="scss">

.dash {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.numbers {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}

.graphs {
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;

  .vue-apexcharts {
    margin: 30px 10px;
    width: calc(50% - 60px);
  }
}

@media (min-width: 1500px){
  .graphs {
    .vue-apexcharts {
      margin: 30px;
    }
  }
}

</style>