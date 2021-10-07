<template>
  <div class="dash">
    <div class="numbers">
      <DashNumber num="20" name="manutenção"/>
      <DashNumber num="30" name="manutenção"/>
      <DashNumber num="40" name="manutenção"/>
      <DashNumber num="50" name="manutenção"/>
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
//import axios from 'axios';
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
      APIkey: '',
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
  setup(props) {
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    console.log(props.img)
    return {
      isAuthenticated
    }
  },
  mounted() {
    if(!this.isAuthenticated) {
      this.$router.push('/')
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