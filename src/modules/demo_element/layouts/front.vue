<template>
  <el-container class="app-container">
    <!--全局头部-->
    <el-header :style="{padding: 0}" height="50px">
      <global-header :current-user="currentUser"
                      :menu-data="getTopMenuData()"
                      :notice-tabs="fetchNoticeTabs()"
                      :collapsed="collapsed"
                      :logo="logo"
                      title="GBSS FRONT"
                      :fetch-sugesstions="fetchSugesstions"
                      @search-select="handleSearchSelect">
      </global-header>
    </el-header>
    <el-container>
      <!-- 左栏菜单 -->
      <sider-menu :collapsed="collapsed" defaultActive='home' :menu-data="getMenuData()" @collapse="handleMenuCollapse"/>
      <!-- Main -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {Container, Header, Main, Menu, MenuItem, Submenu} from 'element-ui'
import GlobalHeader from '@components/element/GlobalHeader'
import SiderMenu from '@components/element/SiderMenu'
import { getMenuData, getTopMenuData } from '../service/menu'
import { fetchNoticeTabs } from '../service/notice'
import logo from '@assets/element/images/logo.png'

export default {
  name: 'layout-front',
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu,
    [GlobalHeader.name]: GlobalHeader,
    [SiderMenu.name]: SiderMenu
  },
  data () {
    return {
      logo,
      collapsed: false
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
    handleSearchSelect (value) {
      console.log('=======' + value)
    },
    getMenuData () {
      return getMenuData()
    },
    getTopMenuData () {
      return getTopMenuData()
    },
    fetchNoticeTabs () {
      return fetchNoticeTabs()
    },
    fetchSugesstions (queryString, cb) {
      // TODO 用AJAX代替
      let data = ['b', 'a', 'c']
      const results = queryString
        ? data.filter((item) => {
          return item.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        }) : data
      // autocomplete只接收{value:xxx}的数组，所以要转换
      cb(results.map(datum => {
        return { value: datum }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.app-container {
  position: relative;
  height: 100%;
  // background: $layout-body-background;
  .el-main {
    padding: 0;
  }
}
.github-icon {
  font-size: 20px;
}
</style>
