<template>
  <el-aside class="sider" :width="collapsed ? '64px' : '256px'">
    <el-menu unique-opened 
            :default-active="selectedKey"
            :default-openeds="openKeys"
            style="padding: '16px 0', width: '100%'"
    >
    </el-menu>
  </el-aside>
</template>

<script>
import Vue, { VNode } from 'vue'
import { Aside, Menu, MenuItem, Submenu } from 'element-ui'
import * as pathToRegexp from 'path-to-regexp'
import { urlToList } from '../utils/pathTools'

export const getMenuMatchKeys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    return pathToRegexp(item).test(path)
  })
}
export default {
  components: {
    Aside,
    Menu,
    MenuItem,
    Submenu
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array,
      default() {
        return []
      }
    },
    logo: '',
    Authorized: Function
  },
  data() {
    const openKeys = []
    const flatMenuKeys = []
    return {
      openKeys,
      flatMenuKeys
    }
  },
  computed: {
    menus () {
      return this.menuData
    }
  },
  // watch: {
  //   collapsed() {
  //     this.openKeys = this.getDefaultCollapsedSubMenus()
  //   }
  // },
  created() {
    this.flatMenuKeys = this.getFlatMenuKeys(this.menuData)
    this.openKeys = this.getDefaultCollapsedSubMenus()
  },
  methods: {
    /**
     * Convert pathname to openKeys
     * /list/search/articles = > ['list','/list/search']
     * @param  props
     */
    getDefaultCollapsedSubMenus() {
      const pathname = this.$route.path
      return urlToList(pathname)
        .map(item => {
          return getMenuMatchKeys(this.flatMenuKeys, item)[0]
        })
        .filter(item => item)
    },
    /**
     * Recursively flatten the data
     * [{path:string},{path:string}] => {path,path2}
     * @param  menus
     */
    getFlatMenuKeys (menus) {
      let keys = []
      menus.forEach(item => {
        if (item.children) {
          keys = keys.concat(this.getFlatMenuKeys(item.children))
        }
        keys.push(item.path)
      })
      return keys
    },
    getMenuItem (item) {
      const icon = this.$createElement('i', { class: `icon ${item.icon}` })
      const title = this.$createElement('span', { slot: 'title' }, item.name)
      const elMenuItem = this.$createElement(
        'el-menu-item',
        {
          props: {
            index: item.path
          }
        },
        [item.icon && icon, title]
      )
      const itemPath = this.conversionPath(item.path)
      if (/^https?:\/\//.test(itemPath)) {
        return this.$createElement(
          'a',
          {
            attrs: {
              href: itemPath,
              target: item.target
            }
          },
          [elMenuItem]
        )
      } else {
        return this.$createElement(
          'router-link',
          {
            props: {
              to: itemPath
            }
          },
          [elMenuItem]
        )
      }
    },
    getSubMenuOrItem (item) {
      if (item.children && item.children.some((child) => child.name)) {
        return this.$createElement(
          'el-submenu',
          {
            props: {
              index: item.path
            },
            key: item.path,
            scopedSlots: {
              title: (props) => {
                return [
                  item.icon &&
                    this.$createElement('i', { class: `icon ${item.icon}` }),
                  this.$createElement('span', { slot: 'title' }, item.name)
                ]
              }
            }
          },
          this.getNavMenuItems(item.children)
        )
      } else {
        return this.getMenuItem(item)
      }
    },
    getNavMenuItems (menusData) {
      if (!menusData) {
        return []
      }
      return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => {
          // make dom
          const ItemDom = this.getSubMenuOrItem(item)
          return this.checkPermissionItem(item.authority, ItemDom)
        })
        .filter(item => item)
    },
    // Get the currently selected menu
    getSelectedMenuKeys() {
      const pathname = this.$route.path
      return urlToList(pathname).map(itemPath => {
        return getMenuMatchKeys(this.flatMenuKeys, itemPath).pop()
      })
    },
    // conversion Path
    // 转化路径
    conversionPath (path) {
      if (path && path.indexOf('http') === 0) {
        return path
      } else {
        return `/${path || ''}`.replace(/\/+/g, '/')
      }
    },
    // permission to check
    checkPermissionItem(authority, ItemDom) {
      return true
    },
    handleOpenChange(openKeys) {
      const lastOpenKey = openKeys[openKeys.length - 1]
      const isMainMenu = this.menus.some(
        item =>
          !!(
            lastOpenKey &&
            (item.key === lastOpenKey || item.path === lastOpenKey)
          )
      )
      this.openKeys = isMainMenu ? [lastOpenKey] : [...openKeys]
    }
  },
  render(h) {
    const { collapsed, logo, openKeys } = this
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys().filter(item => item)
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    const selectedKey = selectedKeys[selectedKeys.length - 1]
    return h(
      'el-aside',
      {
        class: {
          sider: true,
          collapse: collapsed
        },
        props: {
          width: collapsed ? '64px' : '256px'
        }
      },
      [
        h(
          'el-menu',
          {
            props: {
              mode: 'vertical',
              'unique-opened': true,
              collapse: collapsed,
              'default-active': selectedKey,
              'default-openeds': openKeys
            },
            style: {
              padding: '16px 0',
              width: '100%'
            }
          },
          this.getNavMenuItems(this.menuData)
        )
      ]
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';
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
.sider.collapse {
  .logo {
    padding-left: 16px;
  }
}
.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  transition: all 0.3s;
  background: #002140;
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
</style>