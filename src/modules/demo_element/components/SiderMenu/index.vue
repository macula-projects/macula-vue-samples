<template>
  <el-aside :class="collapsed ? 'sider collapsed' : 'sider'" :width="collapsed ? '64px' : '256px'">
    <el-menu unique-opened
            :default-active="this.$route.path"
            :collapse="collapsed"
            style="padding: '16px 0', width: '100%'"
    >
      <template v-for="item in this.menuData" >
        <el-submenu :index="item.code" v-if="item.children.length>0" :key="item.code">
          <template slot="title"  style="padding-left:10px" >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.name}}</span>
          </template>
          <Menu :menuData="item.children"></Menu>
        </el-submenu>
        <el-menu-item v-else :index="item.code"  :key="item.code" style="padding-left: 50px;">
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import {Aside, Menu, Submenu, MenuItem} from 'element-ui'

export default {
  name: 'SiderMenu',
  components: {
    Aside, Menu, Submenu, MenuItem
  },
  props: ['menuData', 'collapsed']
}
</script>

<style lang="scss" scoped>
@import '../../theme/theme.scss';
.sider {
  // height: 100%;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background-color: $layout-sider-background;
  transition: all 0.3s;
  &.collapse {
    overflow: visible;
  }
  /deep/ .el-menu {
    color: $menu-dark-color;
    background: $menu-dark-bg;
    border-right: 0;
    &-item {
      color: $menu-dark-color;
      i {
        color: $menu-dark-color;
      }
      &:hover {
        color: #fff;
        background: transparent;
        > a {
          color: #fff;
        }
        i {
          color: #fff;
        }
      }
      > a {
        color: $menu-dark-color;
        text-decoration: none;
        outline: none;
      }
      &.is-active {
        color: #fff;
        background-color: #1890ff;
        > a {
          color: #fff;
        }
        i {
          color: inherit;
        }
      }
    }
    .el-submenu {
      &__title {
        color: $menu-dark-color;
        > i {
          color: $menu-dark-color;
        }
        &:hover {
          color: #fff;
          background-color: transparent;
          > i {
            color: #fff;
          }
        }
        &__icon-arrow {
          margin-top: -4px;
        }
      }
      &.is-active {
        > .el-submenu__title {
          color: #fff;
          > i {
            color: #fff;
          }
        }
      }
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
