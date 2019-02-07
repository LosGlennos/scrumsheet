<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50">
        <md-field>
          <label>Member name</label>
          <md-input v-model="name"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-15">
        <md-button class="md-raised md-primary" v-on:click="addMember(name)">Add member</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import MembersContext from '../../../datalayer/memberscontext';

export default {
  name: 'add-member',
  data: function() {
    return {
      name: ''
    };
  },
  methods: {
    addMember: function(name) {
      var context = new MembersContext();
      context.addMember(name, this.$router.history.current.params.id).then(() => {
        this.name = '';
        this.$eventHub.$emit('add-member', name);
      });
    }
  }
};
</script>
