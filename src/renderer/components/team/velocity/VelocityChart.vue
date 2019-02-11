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
          var chartData = component.chartData[0];
          component.chartData = [];
          component.chartData.push(chartData);
          for (let i = 0; i < velocity.length; i++) {
            if (velocity[i]) {
              if (i < velocity.length - 1 || (i === velocity.length - 1 && (velocity[i].allocatedEffort || velocity[i].actualEffort))) {
                component.chartData.push([sprints.find(x => x._id === velocity[i].sprintId).name, parseInt(velocity[i].allocatedEffort), parseInt(velocity[i].actualEffort)]);
              }
            }
          }
        });
      });
    }
  }
};
</script>

<style>
</style>
