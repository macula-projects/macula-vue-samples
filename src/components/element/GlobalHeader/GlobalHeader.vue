<template>
  <div class="global-header">
    <!--头部左边-->
    <div class="left">
      <!-- LOGO -->
      <div class='logo' v-if="logo" :style="{width : collapsed ? '64px' : '226px'}">
        <router-link to='/'>
          <img alt='logo' :src=logo />
          <h1>{{title || 'Macula UI Pro'}}</h1>
        </router-link>
      </div>
      <!-- 顶部左边菜单 -->
      <top-menu :menu-data="menus" />
    </div>
    <div class="right">
      <header-search class="action search" placeholder="站内搜索" v-model="searchValue" :fetch-sugesstions="fetchSugesstions" @select="onSearchSelect"/>
      <!--帮助-->
      <a target="_blank" href="helpurl" class="action">
        <ant-icon type="question-circle-o"/>
      </a>
      <!--消息提醒-->
      <notice-icon v-if="noticeTabs" class="action notice" :tabs="noticeTabs" :badge="currentUser.notifyCount" />

      <!--个人菜单-->
      <el-dropdown v-if="currentUser.name" class="action" @command="onUserMenuClick">
        <span class="action account">
          <avatar class="avatar" size="small" :src="currentUser.avatar"/>
          <span class="name">{{currentUser.name}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <slot name="top-user-dropdown">
            <el-dropdown-item disabled>个人中心</el-dropdown-item>
            <el-dropdown-item disabled>设置</el-dropdown-item>
            <el-dropdown-item divided command="logout">
              退出登录
            </el-dropdown-item>
          </slot>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else class="action loading-wrapper">
        <div class="loading" v-loading="true"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading, Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import Avatar from '../Avatar'
import AntIcon from '../AntIcon'
import HeaderSearch from '../HeaderSearch'
import TopMenu from '../TopMenu'
import NoticeIcon from '../NoticeIcon'

export default {
  name: 'GlobalHeader',
  componentName: 'GlobalHeader',
  components: {
    [Loading.name]: Loading,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    Avatar,
    [AntIcon.name]: AntIcon,
    HeaderSearch,
    NoticeIcon,
    TopMenu
  },
  props: {
    menuData: {
      type: Array,
      default () {
        return []
      }
    },
    currentUser: {
      type: Object,
      default () {
        return {}
      }
    },
    fetchSugesstions: Function,
    collapsed: {
      type: Boolean
    },
    noticeTabs: {
      type: Array,
      default () {
        return []
      }
    },
    isMobile: Boolean,
    logo: String,
    title: String,
    width: {
      type: String,
      default () {
        return '256px'
      }
    }
  },
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    menus () {
      return this.menuData
    }
  },
  watch: {
    searchValue (value) {
      console.log('search input', value)
    }
  },
  methods: {
    onSearchSelect (value) {
      this.$emit('search-select', value)
    },
    onHelpClick () {
      console.log('help click')
    },
    onUserMenuClick (command) {
      this.$emit('user-menu-click', command)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.global-header {
  height: 50px;
  padding: 0 0 0 0;
  color: #fff;
  background:#373d41;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    display: flex;
    .logo {
      height: 50px;
      position: relative;
      line-height: 50px;
      padding-left: 16px;
      background: #373d41;
      transition: all 0.3s;
      overflow: hidden;
      img {
        display: inline-block;
        vertical-align: middle;
        height: 32px;
      }
      h1 {
        color: #fff;
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        margin: 0 0 0 12px;
        // font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
      }
    }
  }
  .right {
    height: 100%;
    display: flex;
    .action {
      cursor: pointer;
      padding: 0 12px;
      transition: all 0.3s;
      height: 100%;
      display: flex;
      align-items: center;
      > i {
        font-size: 16px;
        vertical-align: middle;
        color: #fff
      }
      &.popover-open,
      &:hover {
        background: #2a2f32;
      }
    }
    .search {
      padding: 0;
      margin: 0 12px;
      &:hover {
        background: transparent;
      }
    }
    .notice {
      padding: 0;
    }
    .account {
      color: #fff;
      .avatar {
        margin: 20px 8px 20px 0;
        color: $primary-color;
        background: rgba(255, 255, 255, 0.85);
        vertical-align: middle;
      }
    }
    .loading-wrapper {
      .loading {
        width: 30px;
        height: 30px;
        /deep/ .el-loading-spinner {
          margin-top: -15px;
          .circular {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
