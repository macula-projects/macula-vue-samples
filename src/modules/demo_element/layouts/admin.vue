<template>
  <el-container class="app-container" verti>
    <!--全局头部-->
    <el-header :style="{padding: 0}" height="64px">
      <global-header
        :logo="logo"
        :current-user="currentUser"
        :collapsed="collapsed"
        @collapse="handleMenuCollapse"
        @menu-click="handleMenuClick"
      />
    </el-header>
    <el-container>
      <!-- 左栏菜单 -->
      <sider-menu
        :collapsed="collapsed"
        :logo="logo"
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
import Vue from 'vue'
import {
  Container,
  Aside,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Footer
} from 'element-ui'
import { getMenuData } from '../service/menu'
import logo from '../assets/logo.png'
import GlobalHeader from '../components/GlobalHeader'
import SiderMenu from '../components/SiderMenu'

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = []
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`
      })
      item.children.forEach((children) => {
        getRedirect(children)
      })
    }
  }
}
getMenuData().forEach(getRedirect)

export default {
  name: 'layout-admin',
  components: {
    Container,
    Aside,
    Header,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Main,
    GlobalHeader,
    SiderMenu
  },
  data() {
    return {
      logo,
      collapsed: false,
      searchValue: ''
    }
  },
  computed: {
    currentUser () {
      return 'Rain Wang'
    }
  },
  watch: {
    searchValue (value) {
      console.log('search input', value)
    }
  },
  mounted () {
    this.$store.dispatch('user/fetchCurrent')
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
@import '~theme/theme.scss';
.app-container {
  position: relative;
  height: 100%;
  background: $layout-body-background;
}
.github-icon {
  font-size: 20px;
}
</style>
