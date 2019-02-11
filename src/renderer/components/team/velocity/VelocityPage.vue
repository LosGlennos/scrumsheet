<template>
  <div class="md-layout">
    <velocity-table class="md-layout-item md-size-35"></velocity-table>
    <velocity-chart class="md-layout-item md-size-65"></velocity-chart>
  </div>
</template>

<script>
import VelocityTable from './VelocityTable';
import VelocityChart from './VelocityChart';

export default {
  name: 'velocity-page',
  components: {VelocityTable, VelocityChart},
  methods: {
  }
};
</script>

<style>
</style>
