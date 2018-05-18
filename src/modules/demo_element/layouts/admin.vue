<template>
  <el-container class="app-container">
    <!-- 左栏菜单 -->
    <sider-menu :collapsed="collapsed" :logo="logo" :menu-data="getMenuData()"/>
    <el-container>
      <!--全局头部-->
      <el-header :style="{padding: 0}" height="50px">
        <global-header :current-user="currentUser" :collapsed="collapsed" @collapse="handleMenuCollapse">
          <top-menu :menu-data="getMenuData()" slot="top-menu" />
        </global-header>
      </el-header>
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
import TopMenu from '@components/element/TopMenu'
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
    SiderMenu,
    TopMenu
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
