<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50">
        <md-field>
          <label>Team name</label>
          <md-input v-model="name"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-15">
        <md-button class="md-raised md-primary" v-on:click="addTeam(name)">Add team</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { TeamsContext } from '../../datalayer/teamscontext';

export default {
  name: 'add-team',
  data: function() {
    return {
      name: ''
    };
  },
  methods: {
    addTeam: function(name) {
      var context = new TeamsContext();
      context.addTeam(name).then(() => {
        this.$eventHub.$emit('add-team', name);
      });
    }
  }
};
</script>
