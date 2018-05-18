<template>
  <div class="global-header">
    <!--头部左边-->
    <div class="left">
      <!-- LOGO -->
      <ant-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="trigger" @click="toggle" />
      <!-- 左边菜单，可以在外部用slot替换 -->
      <slot name="top-menu">
        <el-menu>
          <el-menu-item index="1">首页</el-menu-item>
        </el-menu>
      </slot>
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
          <el-dropdown-item disabled>个人中心</el-dropdown-item>
          <el-dropdown-item disabled>设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else class="action loading-wrapper">
        <div class="loading" v-loading="true"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { Loading, Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import Avatar from '../Avatar/index.vue'
import AntIcon from '../AntIcon/index.vue'
import HeaderSearch from '../HeaderSearch/index.vue'
import NoticeIcon from '../NoticeIcon/index.vue'

export default {
  components: {
    [Loading.name]: Loading,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    Avatar,
    HeaderSearch,
    NoticeIcon,
    AntIcon
  },
  props: {
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
    },
    toggle () {
      const { collapsed } = this
      this.$emit('collapse', !collapsed)
      debounce(this.triggerResizeEvent, 600)()
    },
    triggerResizeEvent () {
      const event = document.createEvent('HTMLEvents')
      event.initEvent('resize', true, false)
      window.dispatchEvent(event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.global-header {
  height: 50px;
  padding: 0 12px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    display: flex;
    .trigger {
      font-size: 20px;
      line-height: 50px;
      cursor: pointer;
      transition: all 0.3s;
      padding: 0 24px;
      &:hover {
        background: $primary-1;
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
        color: rgba(0, 0, 0, 0.65)
      }
      &.popover-open,
      &:hover {
        background: $primary-1;
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
