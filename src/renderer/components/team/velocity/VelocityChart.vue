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
import VelocityContext from '../../../datalayer/velocitycontext';
import SprintsContext from '../../../datalayer/sprintscontext';

export default {
  name: 'velocity-chart',
  components: {GChart},
  data: function() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Sprint', 'Allocated', 'Actual']
      ],
      chartOptions: {
        chart: {
          title: 'Team velocity',
          subtitle: ''
        }
      }
    };
  },
  created: function(event) {
    this.getChartData();
    this.$eventHub.$on('update-chart', this.getChartData);
  },
  methods: {
    getChartData() {
      var velocityContext = new VelocityContext();
      var sprintContext = new SprintsContext();
      var component = this;

      sprintContext.getSprints(this.$route.params.id).then(sprints => {
        velocityContext.getVelocityByTeamId(this.$route.params.id).then((velocity) => {
          var unsortedChartData = [];
          for (let i = 0; i < velocity.length; i++) {
            if (velocity[i]) {
              if (i < velocity.length - 1 || (i === velocity.length - 1 && (velocity[i].allocatedEffort || velocity[i].actualEffort))) {
                unsortedChartData.push([
                  sprints.find(x => x._id === velocity[i].sprintId).name,
                  parseInt(velocity[i].allocatedEffort),
                  parseInt(velocity[i].actualEffort)]);
              }
            }
          }

          component.pushSortedDataToChart(unsortedChartData, sprints);
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
        ['Sprint', 'Allocated', 'Actual']
      ];
    }
  }
};
</script>

<style>
</style>
