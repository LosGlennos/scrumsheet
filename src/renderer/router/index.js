import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/teams',
      name: 'teams-page',
      component: require('@/components/teams/TeamsPage').default
    },
    {
      path: '/teams/:id',
      name: 'team-page',
      component: require('@/components/team/TeamPage').default
    },
    {
      path: 'teams/:id/members',
      name: 'members-page',
      component: require('@/components/team/teammembers/MembersPage').default
    },
    {
      path: '*',
      redirect: '/teams'
    }
  ]
});
