<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-20">
        <md-field>
          <label>Sprint name</label>
          <md-input v-model="name"></md-input>
        </md-field>
      </div>
      <div class="datepicker-trigger">
        <md-field>
          <label>Select Date</label>
          <md-input id="datepicker-trigger" v-model="formattedDates"></md-input>
        </md-field>
        <AirbnbStyleDatepicker
          :trigger-element-id="'datepicker-trigger'"
          :mode="'range'"
          :date-one="startDate"
          :date-two="endDate"
          @date-one-selected="val => { startDate = val }"
          @date-two-selected="val => { endDate = val }"
          @apply="formatDates(startDate, endDate)"
        />
      </div>
      <div class="md-layout-item md-size-15">
        <md-button
          class="md-raised md-primary"
          v-on:click="addSprint(name, startDate, endDate)"
        >Add Sprint</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import SprintsContext from "../../../datalayer/sprintscontext";
import moment from "moment";

export default {
  name: "add-sprint",
  data: () => ({
    name: "",
    startDate: null,
    endDate: null,
    formattedDates: null
  }),
  methods: {
    addSprint: function(name, startDate, endDate) {
      var context = new SprintsContext();
      var teamId = this.$route.params.id;
      context.addSprint(name, startDate, endDate, teamId).then(() => {
        this.name = "";
        this.startDate = "";
        this.endDate = "";
        this.formattedDates = "";
        this.$eventHub.$emit("add-sprint", name);
      });
    },
    formatDates(startDate, endDate) {
      this.formattedDates = `${moment(String(startDate)).format("YYYY-MM-DD")} - ${moment(String(endDate)).format("YYYY-MM-DD")}`;
    }
  }
};
</script>
