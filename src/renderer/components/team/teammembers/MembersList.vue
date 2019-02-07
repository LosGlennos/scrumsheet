<template>
  <div>
    <div class="md-elevation-5 md-layout md-alignment-center" v-for="member in members" :key="member._id">
      <div class="md-layout-item md-size-5">
        <md-avatar class="md-avatar-icon">?</md-avatar>
      </div>
      <div class="md-layout-item md-size-90">
        <span class="">{{ member.name }}</span>
      </div>
      <div class="md-layout-item md-size-5">
        <md-button class="delete-button md-icon-button md-accent md-raised" v-on:click="deleteMember(member._id)">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import MembersContext from '../../../datalayer/memberscontext';

export default {
  name: 'member-list',
  data: function() {
    return {
      members: []
    };
  },
  created: function(event) {
    this.getMembers();
    this.$eventHub.$on('add-member', this.getMembers);
  },
  methods: {
    getMembers: function() {
      var context = new MembersContext();
      context.getMembers(this.$route.params.id).then((data) => {
        this.members = data;
      });
    },
    deleteMember: function(id) {
      var context = new MembersContext();
      context.deleteMember(id).then((data) => {
        this.getMembers();
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
