<script>
import { Menu, MenuItem, Submenu } from 'element-ui'

export default {
  name: 'TopMenu',
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
    }
  },

  methods: {
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
            key: item.path
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
          return this.getSubMenuOrItem(item, h)
        })
        .filter(item => item)
    },
    // conversion Path
    // 转化路径
    conversionPath (path) {
      if (path && path.indexOf('http') === 0) {
        return path
      } else {
        return `/${path || ''}`.replace(/\/+/g, '/')
      }
    }
  },
  render (h) {
    return h(
      'el-menu',
      {
        props: {
          mode: 'horizontal',
          'background-color': '#fff'
        }
      },
      this.getNavMenuItems(this.menuData, h)
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';

.el-menu--horizontal {
  border: none;
  &>.el-menu-item {
      height: 50px;
      line-height: 50px;
  }
  &>.el-submenu {
      /deep/ .el-submenu__title {
        height: 50px;
        line-height: 50px;
      }
      .icon {
        margin-right: 10px;
      }
  }
}
</style>
