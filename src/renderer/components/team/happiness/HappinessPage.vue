<template>
  <div class="md-layout">
    <happiness-table class="md-layout-item md-size-35"></happiness-table>
    <happiness-chart class="md-layout-item md-size-65"></happiness-chart>
  </div>
</template>

<script>
import HappinessTable from './HappinessTable';
import HappinessChart from './HappinessChart';

export default {
  name: 'happiness-page',
  components: {HappinessTable, HappinessChart},
  methods: {
  }
};
</script>

<style>
</style>
