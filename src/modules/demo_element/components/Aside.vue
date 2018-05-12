<template>
  <el-aside width="230px"
      :collapsed="collapsed"
      :logo="logo"
      :menu-data="getMenuData()"
      :Authorized="getAuthrozed()">
  </el-aside>
</template>

<script>
import {Aside, Menu, Submenu, MenuItem} from 'element-ui'
import {getMenuData} from '../service/menu'

export default {
  name: 'MuAside',
  components: {
    [Aside.name]: Aside,
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    handleopen () {
      // console.log('handleopen');
    },
    handleclose () {
      // console.log('handleclose');
    },
    handleselect: function (a, b) {
    }
  }
}
</script>
