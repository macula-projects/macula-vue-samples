<template>
  <el-container class="app-container" verti>
    <!--全局头部-->
    <el-header :style="{padding: 0}">
      <global-header
        :logo="logo"
        :current-user="currentUser"
        :collapsed="collapsed"
        @collapse="handleMenuCollapse"
        @menu-click="handleMenuClick"
      >
        <el-menu
          :default-active="'1'"
          mode="horizontal"
          slot="menu">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </global-header>
    </el-header>
    <el-container>
      <!-- 左栏菜单 -->
      <sider-menu
        :collapsed="collapsed"
        :menu-data="getMenuData()"
      >
      </sider-menu>

      <!-- Main -->
      <el-main :style="{'padding-bottom': 0}">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {Container, Header, Main, Menu, MenuItem, Submenu} from 'element-ui'
import GlobalHeader from '@components/element/GlobalHeader'
import SiderMenu from '@components/element/SiderMenu'
import { getMenuData } from '../service/menu'
import logo from '@assets/element/images/logo.png'

export default {
  name: 'layout-admin',
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu,
    GlobalHeader,
    SiderMenu
  },
  data () {
    return {
      logo,
      collapsed: false,
      searchValue: ''
    }
  },
  computed: {
    currentUser () {
      return {
        name: 'Rain Wang',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        notifyCount: 12
      }
    }
  },
  watch: {
    searchValue (value) {
      console.log('search input', value)
    }
  },
  mounted () {
    // this.$store.dispatch('user/fetchCurrent')
  },
  methods: {
    handleMenuCollapse (collapsed) {
      this.collapsed = collapsed
    },
    handleMenuClick (command) {
      if (command === 'logout') {
        this.$store.dispatch('login/logout')
      }
    },
    getMenuData () {
      return getMenuData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.app-container {
  position: relative;
  height: 100%;
  background: $layout-body-background;
}
.github-icon {
  font-size: 20px;
}

</style>
