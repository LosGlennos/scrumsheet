<template>
  <div class="md-gutter">
    <add-team></add-team>

    <team-list></team-list>
  </div>
</template>

<script>
import AddTeam from './AddTeam';
import TeamList from './TeamList';

export default {
  name: 'teams-page',
  components: {AddTeam, TeamList},
  methods: {

  }
};
</script>

<style>
</style>
