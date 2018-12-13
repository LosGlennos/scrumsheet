<template>
  <div>
    <add-team></add-team>

    <team-list></team-list>
  </div>
</template>

<script>
import AddTeam from './AddTeam';
import TeamList from './TeamList';

export default {
  name: 'teams',
  components: {AddTeam, TeamList},
  methods: {

  }
};
</script>

<style>
</style>
