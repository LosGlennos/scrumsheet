<template>
  <div id="app">
    <div class="page-container">
      <md-app style="min-height: 100vh;" >
        <md-app-toolbar class="md-accent" md-elevation="0">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Scrumsheet</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Navigation</span>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <router-link to="/">
              <md-list-item>
                <md-icon>home</md-icon>
                <span class="md-list-item-text">Home</span>
              </md-list-item>
            </router-link>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <router-view></router-view>
        </md-app-content>
      </md-app>
    </div>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
  </div>
</template>

<script>
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker';
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css';

var datepickerOptions = {
  sundayFirst: false,
  dateLabelFormat: 'yyyy-MM-dd'
};

Vue.use(VueMaterial);
Vue.use(AirbnbStyleDatepicker, datepickerOptions);

export default {
  name: 'scrumsheet',
  data: function() {
    return {
      menuVisible: false
    };
  },
  methods: {
    toggleMenu: function() {
      this.menuVisible = !this.menuVisible;
    }
  }
};
</script>

<style>
.md-app {
  height: 100%;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
}
/* CSS */
</style>

