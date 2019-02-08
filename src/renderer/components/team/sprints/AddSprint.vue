<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-20">
        <md-field>
          <label>Sprint name</label>
          <md-input v-model="name"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-15">
        <md-datepicker v-model="startDate" md-immediately>
          <label>Start date</label>
        </md-datepicker>
      </div>
      <div class="md-layout-item md-size-15">
        <md-datepicker v-model="endDate" md-immediately>
          <label>End date</label>
        </md-datepicker>
      </div>
      <div class="md-layout-item md-size-15">
        <md-button class="md-raised md-primary" v-on:click="addSprint(name, startDate, endDate)">Add Sprint</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import SprintsContext from '../../../datalayer/sprintscontext';

export default {
  name: 'add-sprint',
  data: () => ({
    name: '',
    startDate: null,
    endDate: null
  }),
  created: function(event) {
    this.$material.locale.firstDayOfAWeek = 1;
  },
  methods: {
    addSprint: function(name, startDate, endDate) {
      var context = new SprintsContext();
      var teamId = this.$route.params.id;
      context.addSprint(name, startDate, endDate, teamId).then(() => {
        this.name = '';
        this.startDate = null;
        this.endDate = null;
        this.$eventHub.$emit('add-sprint', name);
      });
    }
  }
};
</script>
