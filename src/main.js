// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import API from './js/api.js'
import axios from 'axios'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  mounted() {
    this.$store.commit('checkUser');
    this.$store.commit('isWeixn');
    this.$store.commit('carCount');
  },
  components: { App }
});


