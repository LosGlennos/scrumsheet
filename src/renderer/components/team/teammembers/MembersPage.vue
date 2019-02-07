<template>
  <div>
    <add-member></add-member>

    <members-list></members-list>
  </div>
</template>

<script>
import AddMember from './AddMember';
import MembersList from './MembersList';

export default {
  name: 'members-page',
  components: {AddMember, MembersList},
  methods: {

  }
};
</script>

<style>
</style>
