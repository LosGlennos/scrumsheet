<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head v-for="member in members" :key="member._id">{{ member.name }}</md-table-head>
        <md-table-head>Total (hours)</md-table-head>
      </md-table-row>

      <md-table-row v-for="sprint in sprints" :key="sprint._id">
        <md-table-cell>{{ sprint.name }}</md-table-cell>
        <md-table-cell v-for="member in members" :key="member._id">
          <md-field>
            <md-input v-if="hours" v-model="hours[member._id][sprint._id]" v-on:blur="saveCapacity(hours[member._id][sprint._id], sprint._id, member._id)" type="number"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell>
          {{ getTotalHoursForSprint(sprint._id) }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import MembersContext from '../../../datalayer/memberscontext';
import SprintsContext from '../../../datalayer/sprintscontext';
import CapacityContext from '../../../datalayer/capacitycontext';

export default {
  name: 'capacity-table',
  components: {},
  data: () => ({
    members: null,
    sprints: null,
    hours: null
  }),
  created: function(event) {
    this.getCapacityTable();
  },
  methods: {
    saveCapacity: function(hours, sprintId, memberId) {
      var capacityContext = new CapacityContext();
      capacityContext.saveCapacity(hours, sprintId, memberId, this.$route.params.id).then((data) => {
        this.getCapacityTable();
      });
    },
    getCapacityTable: function() {
      var membersContext = new MembersContext();
      var sprintsContext = new SprintsContext();
      var capacityContext = new CapacityContext();

      var component = this;
      membersContext.getMembers(this.$route.params.id).then((data) => {
        this.members = data;

        sprintsContext.getSprints(this.$route.params.id).then((data) => {
          component.sprints = data.sort((a, b) => { return new Date(a.startDate) - new Date(b.startDate); });

          capacityContext.getCapacityByTeamId(this.$route.params.id).then((data) => {
            component.hours = {};
            if (data) {
              data.forEach(capacity => {
                if (!component.hours[capacity.memberId]) {
                  component.hours[capacity.memberId] = [];
                }

                component.hours[capacity.memberId][capacity.sprintId] = capacity.hours;
              });

              this.populateMissingData(this);
            } else {
              this.populateMissingData(this);
            }
          });
        });
      });
    },
    getTotalHoursForSprint(id) {
      var totalHours = 0;
      for (var i = 0; i < this.members.length; i++) {
        if (this.hours && this.hours[this.members[i]._id][id]) {
          totalHours += parseInt(this.hours[this.members[i]._id][id]);
        }
      }

      return totalHours;
    },
    populateMissingData(component) {
      component.members.forEach(member => {
        component.sprints.forEach(sprint => {
          if (!component.hours[member._id]) {
            component.hours[member._id] = [];
          }

          var hours = component.hours[member._id][sprint._id];
          component.hours[member._id][sprint._id] = hours != null ? hours : null;
        });
      });
    }
  }
};
</script>

<style>
</style>
