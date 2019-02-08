<template>
  <div>
    <add-sprint></add-sprint>

    <sprints-list></sprints-list>
  </div>
</template>

<script>
import AddSprint from './AddSprint';
import SprintsList from './SprintsList';

export default {
  name: 'sprints-page',
  components: {AddSprint, SprintsList},
  methods: {

  }
};
</script>

<style>
</style>
