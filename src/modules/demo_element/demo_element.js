import 'es6-promise/auto'
import Vue from 'vue'
import FastClick from 'fastclick'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import { VueExtendLayout, layout } from '../../plugins/layout'

import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@/assets/element/scss/anticon.scss'
import '@/assets/element/scss/element-theme.scss'
import './demo_element.scss'

Vue.prototype.$ELEMENT = { size: 'small' }

// 处理element状态，加载动画、前进后退、位置
store.registerModule('element', {
  state: {
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
})

Vue.use(VueExtendLayout, {layouts: require.context('./layouts', false, /^\.\/.*\.vue$/)})

// 点击延迟
FastClick.attach(document.body)

// 将当前路由信息同步到store.state中
sync(store, router)

// 简单的路由历史管理
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

// 路由跳转前的附加动作
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', { isLoading: true })
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', { direction: 'forward' })
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', { direction: '' })
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', { direction: 'forward' })
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

// 路由跳转后的附加动作
router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', { isLoading: false })
})

/* eslint-disable*/
// 实例Vue
new Vue({
  el: '#app',
  store,
  router,
  ...layout,
  http: {
    header: {
      'Content-Type': 'application/json'
    }
  }
})
