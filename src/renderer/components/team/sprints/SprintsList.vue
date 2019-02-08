<template>
  <div v-if="sprints.length > 0">
    <div class="md-elevation-5 md-layout md-alignment-center" v-for="sprint in sprints" :key="sprint._id">
      <div class="md-layout-item md-size-5">
        <md-avatar class="md-avatar-icon">?</md-avatar>
      </div>
      <div class="md-layout-item md-size-30">
        <span class>{{ sprint.name }}</span>
      </div>
      <div class="md-layout-item md-size-5">
        <span class>{{ sprint.startDate | formatDate}}</span>
      </div>
      <md-icon>arrow_forward</md-icon>
      <div class="md-layout-item md-size-5">
        <span class>{{ sprint.endDate | formatDate}}</span>
      </div>
      <div class="md-layout-item md-size-5">
        <md-button class="delete-button md-icon-button md-accent md-raised" v-on:click="deleteSprint(sprint._id)">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import SprintsContext from '../../../datalayer/sprintscontext';
import moment from 'moment';

export default {
  name: 'sprints-list',
  data: function() {
    return {
      sprints: []
    };
  },
  created: function(event) {
    this.getSprints();
    this.$eventHub.$on('add-sprint', this.getSprints);
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD');
      }
    }
  },
  methods: {
    getSprints: function() {
      var context = new SprintsContext();
      context.getSprints(this.$route.params.id).then(data => {
        this.sprints = data.sort((a, b) => { return new Date(a.startDate) - new Date(b.startDate); });
      });
    },
    deleteSprint: function(id) {
      var context = new SprintsContext();
      context.deleteSprint(id).then(data => {
        this.getSprints();
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
</style>
