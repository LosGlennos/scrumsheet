<template>
    <div>
      <md-tabs md-alignment="fixed">
        <md-tab id="tab-team" md-label="Team" md-icon="people">
          <members-page></members-page>
        </md-tab>
        <md-tab id="tab-home" md-label="Capacity" md-icon="access_time"></md-tab>
        <md-tab id="tab-pages" md-label="Velocity" md-icon="timeline"></md-tab>
        <md-tab id="tab-posts" md-label="Happiness" md-icon="sentiment_satisfied_alt"></md-tab>
      </md-tabs>
    </div>
</template>

<script>
import MembersPage from './teammembers/MembersPage';

export default {
  name: 'team-page',
  components: {MembersPage},
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
</style>
