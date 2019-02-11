<template>
  <div v-if="sprints && velocity">
    <md-table>
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Allocated</md-table-head>
        <md-table-head>Actual</md-table-head>
      </md-table-row>

      <md-table-row v-for="sprint in sprints" :key="sprint._id">
        <md-table-cell>{{ sprint.name }}</md-table-cell>
        <md-table-cell>
          <md-field>
            <md-input v-model="velocity[sprint._id].allocated" v-on:blur="saveAllocatedEffort(velocity[sprint._id].allocated, sprint._id)" type="number"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell>
          <md-field>
            <md-input v-model="velocity[sprint._id].actual" v-on:blur="saveActualEffort(velocity[sprint._id].actual, sprint._id)" type="number"></md-input>
          </md-field>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import SprintsContext from '../../../datalayer/sprintscontext';
import VelocityContext from '../../../datalayer/velocitycontext';

export default {
  name: 'velocity-table',
  components: {},
  data: () => ({
    sprints: null,
    velocity: null
  }),
  created: function(event) {
    this.getVelocity();
  },
  methods: {
    saveAllocatedEffort: function(effort, sprintId) {
      var velocityContext = new VelocityContext();
      velocityContext.saveAllocatedEffort(effort, sprintId, this.$route.params.id).then(() => {
        this.getVelocity();
      });
    },
    saveActualEffort: function(effort, sprintId) {
      var velocityContext = new VelocityContext();
      velocityContext.saveActualEffort(effort, sprintId, this.$route.params.id).then(() => {
        this.getVelocity();
      });
    },
    getVelocity: function() {
      var sprintsContext = new SprintsContext();
      var velocityContext = new VelocityContext();
      var component = this;
      sprintsContext.getSprints(this.$route.params.id).then((sprints) => {
        this.sprints = sprints.sort((a, b) => { return new Date(a.startDate) - new Date(b.startDate); });

        velocityContext.getVelocityByTeamId(this.$route.params.id).then((data) => {
          for (let i = 0; i < sprints.length; i++) {
            if (!this.velocity) this.velocity = {};
            this.velocity[sprints[i]._id] = {};
          }

          for (let i = 0; i < data.length; i++) {
            component.velocity[data[i].sprintId]['allocated'] = data[i].allocatedEffort;
            component.velocity[data[i].sprintId]['actual'] = data[i].actualEffort;
          }
        });

        this.$eventHub.$emit('update-chart');
      });
    }
  }
};
</script>

<style>
</style>
