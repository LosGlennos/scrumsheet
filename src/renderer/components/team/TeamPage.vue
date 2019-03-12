<template>
  <md-tabs md-alignment="fixed">
    <md-tab id="tab-team" md-label="Team" md-icon="people">
      <members-page></members-page>
    </md-tab>
    <md-tab id="tab-capacity" md-label="Capacity" md-icon="access_time">
      <capacity-page></capacity-page>
    </md-tab>
    <md-tab id="tab-pages" md-label="Velocity" md-icon="timeline">
      <velocity-page></velocity-page>
    </md-tab>
    <md-tab id="tab-happiness" md-label="Happiness" md-icon="sentiment_satisfied_alt">
      <happiness-page></happiness-page>
    </md-tab>
    <md-tab id="tab-sprints" md-label="Sprints" md-icon="autorenew">
      <sprints-page></sprints-page>
    </md-tab>
  </md-tabs>
</template>

<script>
import MembersPage from './teammembers/MembersPage';
import SprintsPage from './sprints/SprintsPage';
import CapacityPage from './capacity/CapacityPage';
import VelocityPage from './velocity/VelocityPage';
import HappinessPage from './happiness/HappinessPage';

export default {
  name: 'team-page',
  components: {MembersPage, SprintsPage, CapacityPage, VelocityPage, HappinessPage},
  data: function() {
    return {
      id: ''
    };
  },
  created: function() {
    this.id = this.$router.history.current.params.id;
  },
  methods: {

  }
};
</script>

<style>
.md-tabs.md-alignment-fixed.md-theme-default {
  height: 100%;
}
.md-content.md-tabs-content.md-theme-default {
  height: 100% !important;
}
</style>
