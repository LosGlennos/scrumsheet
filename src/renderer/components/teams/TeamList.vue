<template>
  <div>
    <md-content class="md-elevation-5" v-for="team in teams" :key="team._id">
      <md-avatar class="md-avatar-icon">A</md-avatar>{{ team.name }}
    </md-content>
  </div>
</template>

<script>
import { TeamsContext } from '../../datalayer/teamscontext';

export default {
  name: 'team-list',
  data: function() {
    return {
      teams: []
    };
  },
  created: function(event) {
    this.getTeams();
    this.$eventHub.$on('add-team', this.getTeams);
  },
  methods: {
    getTeams: function() {
      var context = new TeamsContext();
      context.getTeams().then((data) => {
        console.log(data);
        this.teams = data;
      });
    }
  }
};
</script>

<style>
.md-content {
  height: 60px;
  margin: 15px;
}
</style>
