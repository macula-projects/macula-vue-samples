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
  componentName: 'SiderMenu',
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
    title: String,
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
    },
    handOnItemClick (e) {
      let menuItemTitle = this.$refs[e.$attrs.itemcode]
      if (menuItemTitle) {
        if (menuItemTitle.$el) {
          menuItemTitle.$el.click()
        } else {
          menuItemTitle.click()
        }
      }
    },
    getSubMenuOrItem (item) {
      if (item.children && item.children.some((child) => child.name)) {
        return (
          <el-submenu index={item.path} key={item.code}>
            <template slot='title'>
              {item.icon && <i class='icon ' {...{class: item.icon}} />}
              <span>{item.name}</span>
            </template>
            {this.getNavMenuItems(item.children)}
          </el-submenu>
        )
      } else {
        let title = <span ref={item.code}>{item.name}</span>
        if (item.path && item.path.length > 0) {
          const itemPath = this.conversionPath(item.path)
          if (/^https?:\/\//.test(itemPath)) {
            title = <a href={itemPath} target={item.target} ref={item.code}>{item.name}</a>
          } else {
            title = <router-link to={itemPath} ref={item.code}>{item.name}</router-link>
          }
        }

        return (
          <el-menu-item index={item.path} itemcode={item.code} onClick={this.handOnItemClick}>
            <template slot='title'>
              {item.icon && <i class='icon ' {...{class: item.icon}} />}
              {title}
            </template>
          </el-menu-item>
        )
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
        }).filter(item => item)
    }
  },
  render (h) {
    const { collapsed, logo, openKeys, title, menuData } = this
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys().filter(item => item)
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    const selectedKey = selectedKeys[selectedKeys.length - 1]

    return (
      <el-aside class={collapsed ? 'sider collapse' : 'sider'} width={collapsed ? '64px' : '256px'}>
        {
          logo ? (
            <div class='logo'>
              <router-link to='/'>
                <img alt='logo' src={logo} />
                <h1>{title || 'Macula UI Pro'}</h1>
              </router-link>
            </div>
          ) : ''
        }
        <el-menu mode='vertical' unique-opened={true} collapse={collapsed} collapseTransition={false} default-active={selectedKey} default-openeds={openKeys}>
          {this.getNavMenuItems(menuData)}
        </el-menu>
      </el-aside>
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.sider {
  // height: 100%;
  // min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background-color: $layout-sider-background;
  transition: all 0.3s;

  /deep/ .el-menu {
    color: $menu-dark-color;
    background: $menu-dark-bg;
    border-right: 0;
    &--inline {
      background: #000c17;
    }
    &-item {
      color: inherit;
      i {
        color: inherit;
      }
      > a {
        color: inherit;
        text-decoration: none;
        outline: none;
      }
      &:hover {
        color: #fff;
        background-color: #000c17;
        i {
          color: inherit;
        }
        > a {
          color: inherit;
        }
      }
      &.is-active {
        color: #fff;
        background-color: #1890ff;
        i {
          color: inherit;
        }
        > a {
          color: inherit;
        }
      }
    }

    .el-submenu {
      &__title {
        height: 44px;
        line-height: 44px;
        color: inherit;
        > i {
          color: inherit;
        }
        &:hover {
          color: #fff;
          background-color: $menu-dark-bg;
          > i {
            color: inherit;
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
