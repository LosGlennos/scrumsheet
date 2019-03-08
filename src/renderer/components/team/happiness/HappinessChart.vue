<template>
  <div>
    <GChart
    class="width: 100%"
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
  />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';
import SprintsContext from '../../../datalayer/sprintscontext';
import HappinessContext from '../../../datalayer/happinesscontext';

export default {
  name: 'happiness-chart',
  components: {GChart},
  data: function() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Sprint', 'Happiness']
      ],
      chartOptions: {
        chart: {
          title: 'Team happiness',
          subtitle: ''
        }
      }
    };
  },
  created: function(event) {
    this.getChartData();
    this.$eventHub.$on('update-happiness', this.getChartData);
  },
  methods: {
    getChartData() {
      var happinessContext = new HappinessContext();
      var sprintContext = new SprintsContext();

      sprintContext.getSprints(this.$route.params.id).then(sprints => {
        happinessContext.getHappinessByTeamId(this.$route.params.id).then((happiness) => {
          var unsortedChartData = [];
          for (let i = 0; i < happiness.length; i++) {
            if (happiness[i]) {
              if ((i < happiness.length - 1 && happiness[i].rating) || (i === happiness.length - 1 && happiness[i].rating)) {
                unsortedChartData.push([
                  sprints.find(x => x._id === happiness[i].sprintId).name,
                  parseFloat(happiness[i].rating)]);
              }
            }
          }
          this.pushSortedDataToChart(unsortedChartData, sprints);
        });
      });
    },
    pushSortedDataToChart(unsortedChartData, sprints) {
      this.resetChartData();

      var sortedChartData = this.sortChartData(unsortedChartData, sprints);
      sortedChartData.forEach(x => {
        if (x) {
          this.chartData.push(x);
        }
      });
    },
    sortChartData(unsortedChartData, sprints) {
      var sortedSprints = sprints.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });

      var sortedChartData = [];
      var sprintNameIndex = 0;
      for (let i = 0; i < sortedSprints.length; i++) {
        var chartData = unsortedChartData.find(x => {
          return sortedSprints[i].name === x[sprintNameIndex];
        });
        sortedChartData.push(chartData);
      }

      return sortedChartData;
    },
    resetChartData() {
      this.chartData = [
        ['Sprints', 'Happiness']
      ];
    }
  }
};
</script>

<style>
</style>
