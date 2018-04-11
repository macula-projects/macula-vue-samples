// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import { VueExtendLayout, layout } from '../../plugins/layout'

Vue.config.productionTip = false

Vue.use(VueExtendLayout, {layouts: require.context('./layouts', false, /^\.\/.*\.vue$/)})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...layout,
  http: {
    header: {
      'Content-Type': 'application/json'
    }
  }
})
