<template>
  <div class="dash">
    {{}}
    <div class="numbers">
      <DashNumber :num=total_maint name="Total de Manutenções"/>
      <DashNumber :num=maint_agendadas_num name="Manutenções Agendadas"/>
      <DashNumber :num=maint_delayed_num name="Manutenções Atrasadas"/>
      <DashNumber :num=big_cost_num name="Maior Gasto com Manutenção"/>
    </div>
    <div class="graphs">
      <apexchart type="radialBar" height="350" :options="chartOptions" :series="series"></apexchart>
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
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
      big_cost_num: '',
       series: [44, 55, 67, 83],
          chartOptions: {
            chart: {
              height: 350,
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
                  },
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: function () {
                      // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                      return 249
                    }
                  }
                }
              }
            },
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
          },
    }
  },
  methods: {
    getMan() {
      const headers = {
        'cobli-api-key': this.ApiKey,
      }
      axios
        .get("https://api.cobli.co/herbie-1.1/maintenance/maintenances/past",{
          headers:headers,
        })
        .then((res) => {
          //console.log(res.data['pastMaintenancesById'])
          this.Maintenances = res.data['pastMaintenancesById']
          this.total_maint = Object.keys(this.Maintenances).length
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
        .get("https://api.cobli.co/herbie-1.1/maintenance/maintenances/upcoming",{
          headers:headers,
        })
        .then((res) => {
          //console.log(res)
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
    getManCost() {
      const headers = {
        'cobli-api-key': this.ApiKey,
      }
      var now = new Date().getTime();
      var begin = now - 90;
      const params = {
        begin: begin,
        end: now,
        tz: "America/Sao_Paulo",
      }
      axios
        .get("https://api.cobli.co/herbie-1.1/costs/maintenance",{ params: params},{
          headers:headers,
        })
        .then((res) => {
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
          alert("Erro ao validar a chave, favor verificar e tentar novamente")
        })
    },
  },
  setup() {
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    const ApiKey = computed(() => store.getters.ApiKey)
    return {
      isAuthenticated,
      ApiKey
    }
  },
  mounted() {
    if(!this.isAuthenticated) {
      this.$router.push('/')
    } else {
      this.getMan()
      this.getManAgenda()
      this.getManCost()
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
    margin: 30px;
  }
}

</style>