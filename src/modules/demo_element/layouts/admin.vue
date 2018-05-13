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
import {Container, Header, Main} from 'element-ui'
import GlobalHeader from '../components/GlobalHeader'
import SiderMenu from '../components/SiderMenu'
import { getMenuData } from '../service/menu'
import logo from '../assets/logo.png'

export default {
  name: 'layout-admin',
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
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
@import '../theme/theme.scss';
.app-container {
  position: relative;
  height: 100%;
  background: $layout-body-background;
}
.github-icon {
  font-size: 20px;
}
</style>
