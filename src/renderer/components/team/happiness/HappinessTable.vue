<template>
  <div v-if="sprints && happiness">
    <md-table>
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Happiness</md-table-head>
      </md-table-row>

      <md-table-row v-for="sprint in sprints" :key="sprint._id">
        <md-table-cell>{{ sprint.name }}</md-table-cell>
        <md-table-cell>
          <md-field>
            <md-input v-model="happiness[sprint._id]" v-on:blur="saveHappiness(happiness[sprint._id], sprint._id)" type="number"></md-input>
          </md-field>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import SprintsContext from '../../../datalayer/sprintscontext';
import HappinessContext from '../../../datalayer/happinesscontext';

export default {
  name: 'happiness-table',
  components: {},
  data: () => ({
    sprints: null,
    happiness: null
  }),
  created: function(event) {
    this.getHappiness();
  },
  methods: {
    saveHappiness: function(rating, sprintId) {
      var happinessContext = new HappinessContext();
      happinessContext.saveHappiness(rating, sprintId, this.$route.params.id).then(() => {
        this.getHappiness();
      });
    },
    getHappiness: function() {
      var sprintsContext = new SprintsContext();
      var happinessContext = new HappinessContext();

      var component = this;
      sprintsContext.getSprints(this.$route.params.id).then((sprints) => {
        this.sprints = sprints.sort((a, b) => { return new Date(a.startDate) - new Date(b.startDate); });

        happinessContext.getHappinessByTeamId(this.$route.params.id).then((happiness) => {
          for (let i = 0; i < sprints.length; i++) {
            if (!this.happiness) this.happiness = {};
            this.happiness[sprints[i]._id] = {};
          }

          for (let i = 0; i < happiness.length; i++) {
            component.happiness[happiness[i].sprintId] = happiness[i].rating;
          }
        });

        this.$eventHub.$emit('update-happiness');
      });
    }
  }
};
</script>

<style>
</style>
