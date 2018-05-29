<script>
import { Aside, Menu, MenuItem, Submenu } from 'element-ui'
import * as pathToRegexp from 'path-to-regexp'

import { urlToList } from '@assets/element/js/utils/pathTools'

export const getMenuMatchKeys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    return pathToRegexp(item).test(path)
  })
}

export default {
  name: 'SiderMenu',
  components: {
    [Aside.name]: Aside,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array,
      default () {
        return []
      }
    },
    logo: String,
    topTitle: String,
    Authorized: Function
  },
  data () {
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
  watch: {
    collapsed () {
      this.openKeys = this.getDefaultCollapsedSubMenus()
    }
  },
  created () {
    this.flatMenuKeys = this.getFlatMenuKeys(this.menuData)
    this.openKeys = this.getDefaultCollapsedSubMenus()
  },
  methods: {
    /**
     * Convert pathname to openKeys
     * /list/search/articles = > ['list','/list/search', '/list/search/articles']
     * @param  props
     */
    getDefaultCollapsedSubMenus () {
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
        if (item.path) {
          keys.push(item.path)
        }
      })
      return keys
    },
    getMenuItem (item) {
      let title = this.$createElement('span', { slot: 'title' }, item.name)
      if (item.path && item.path.length > 0) {
        const itemPath = this.conversionPath(item.path)
        if (/^https?:\/\//.test(itemPath)) {
          title = this.$createElement('a',
            {
              attrs: {
                href: itemPath,
                target: item.target
              }
            },
            [item.name]
          )
        } else {
          title = this.$createElement('router-link',
            {
              props: {
                to: itemPath
              }
            },
            [item.name]
          )
        }
      }

      return this.$createElement(
        'el-menu-item',
        {
          props: {
            index: item.path
          },
          scopedSlots: {
            title: (props) => {
              return [
                item.icon && this.$createElement('i', { class: `icon ${item.icon}` }),
                title
              ]
            }
          }
        }
      )
    },
    getSubMenuOrItem (item, h) {
      if (item.children && item.children.some((child) => child.name)) {
        return this.$createElement(
          'el-submenu',
          {
            props: {
              index: item.path
            },
            key: item.code
          },
          [
            h(
              'template',
              { slot: 'title' },
              [
                item.icon && this.$createElement('i', { class: `icon ${item.icon}` }),
                this.$createElement('span', { slot: 'title' }, item.name)
              ]
            ),
            this.getNavMenuItems(item.children)
          ]
        )
      } else {
        return this.getMenuItem(item)
      }
    },
    getNavMenuItems (menusData, h) {
      if (!menusData) {
        return []
      }
      return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => {
          // make dom
          const ItemDom = this.getSubMenuOrItem(item, h)
          return this.checkPermissionItem(item.authority, ItemDom)
        })
        .filter(item => item)
    },
    // Get the currently selected menu
    getSelectedMenuKeys () {
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
    checkPermissionItem (authority, ItemDom) {
      const Authorized = this.Authorized
      if (Authorized && Authorized.check) {
        const { check } = Authorized
        return check(authority, ItemDom)
      }
      return ItemDom
    }
  },
  render (h) {
    const { collapsed, logo, openKeys, topTitle } = this
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
          'div',
          {
            class: 'logo'
          },
          [
            h(
              'router-link',
              {
                props: {
                  to: '/'
                }
              },
              [
                h('img', {
                  attrs: {
                    alt: 'logo',
                    src: logo
                  }
                }),
                h('h1', topTitle || 'Macula UI Pro')
              ]
            )
          ]
        ),
        h(
          'el-menu',
          {
            props: {
              mode: 'vertical',
              'unique-opened': true,
              collapse: collapsed,
              collapseTransition: false,
              'default-active': selectedKey,
              'default-openeds': openKeys
            },
            style: {
              padding: '16px 0',
              width: '100%'
            }
          },
          this.getNavMenuItems(this.menuData, h)
        )
      ]
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.sider {
  // height: 100%;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background-color: $layout-sider-background;
  transition: all 0.3s;

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
        background-color: #2d5b86;
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
        height: 44px;
        line-height: 44px;
        color: $menu-dark-color;
        > i {
          color: $menu-dark-color;
        }
        &:hover {
          color: #fff;
          background-color: #2d5b86;
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

  &.collapse {
    overflow: visible;
    .logo {
      padding-left: 16px;
    }
  }
  .logo {
    height: 50px;
    position: relative;
    line-height: 50px;
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
}

.el-menu-item, .el-submenu__title {
      height: 40px;
      line-height: 40px;
}
</style>
