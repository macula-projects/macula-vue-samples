<script>
import { Menu, MenuItem, Submenu } from 'element-ui'

export default {
  name: 'TopMenu',
  componentName: 'TopMenu',
  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu
  },
  props: {
    menuData: {
      type: Array,
      default () {
        return []
      }
    },
    defaultActive: String
  },

  methods: {
    // conversion Path
    // 转化路径
    conversionPath (path) {
      if (path && path.indexOf('http') === 0) {
        return path
      } else {
        return `/${path || ''}`.replace(/\/+/g, '/')
      }
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
          <el-submenu index={'"' + item.code + '"'} key={item.code}>
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
          <el-menu-item index={item.code} itemcode={item.code} onClick={this.handOnItemClick}>
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
          return this.getSubMenuOrItem(item)
        }).filter(item => item)
    }
  },
  render (h) {
    const {defaultActive, menuData} = this
    return (
      <el-menu mode='horizontal' default-active={defaultActive || 'home'}>
        {this.getNavMenuItems(menuData)}
      </el-menu>
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.el-menu--horizontal {
  border: none;
  color: #303133;
  background: #fff;
  &>.el-menu {
    &>.el-menu-item {
      &:hover {
        color: inherit;
        background-color: $primary-1;
      }
    }
  }
  &>.el-menu-item {
      height: 50px;
      line-height: 50px;
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
        color: inherit;
        background-color: $primary-1;
        i {
          color: inherit;
        }
        > a {
          color: inherit;
        }
      }
      &.is-active {
        border-bottom: 2px solid #409eff;
      }
  }
  &>.el-submenu {
      /deep/ .el-submenu__title {
        height: 50px;
        line-height: 50px;
        color: inherit;
        > i {
          color: inherit;
        }
        &:hover {
          color: inherit;
          background-color: $primary-1;
          > i {
            color: inherit;
          }
        }
      }
      &.is-active {
        > .el-submenu__title {
          border-bottom: 2px solid #409eff;
        }
      }
      .icon {
        margin-right: 10px;
      }
  }
}
</style>
