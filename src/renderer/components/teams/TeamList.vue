<template>
  <md-list>
    <router-link class="md-elevation-5 md-layout md-alignment-center" v-for="team in teams" :key="team._id" :to="{ name: 'team-page', params: { id: team._id }}" tag="md-list-item">
      <div class="md-layout-item md-size-5">
        <md-avatar class="md-avatar-icon">?</md-avatar>
      </div>
      <div class="md-layout-item md-size-90">
        <span class="">{{ team.name }}</span>
      </div>
      <div class="md-layout-item md-size-5 last-column">
        <md-button class="delete-button md-icon-button md-accent md-raised" v-on:click.prevent="deleteTeam(team._id)">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </router-link>
  </md-list>
</template>

<script>
import TeamsContext from '../../datalayer/teamscontext';

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
        this.teams = data;
      });
    },
    deleteTeam: function(id) {
      var context = new TeamsContext();
      context.deleteTeam(id).then((data) => {
        this.getTeams();
      });
    }
  }
};
</script>

<style>
.md-layout {
  height: 60px;
  margin: 15px;
}

a:not(.md-button):hover {
    text-decoration: none;
    background: lightgray;
}

span {
  color: #5d5d5d;
  font-size: 120%;
}
.md-list-item {
  padding: 5px;
  margin: 0 0 5px 0;
}
.last-column {
  text-align: right;
}
</style>
