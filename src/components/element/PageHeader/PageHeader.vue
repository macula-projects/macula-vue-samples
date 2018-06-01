<script>
import { Tabs, TabPane } from 'element-ui'

export default {
  name: 'PageHeader',
  componentName: 'PageHeader',
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane
  },
  props: {
    title: [String, Array],
    logo: [String, Array],
    action: [String, Array],
    content: [String, Array],
    extraContent: [String, Array],
    tabList: Array,
    tabActiveKey: String
  },
  methods: {
    onChange (tab) {
      const key = tab.name
      this.$emit('tab-change', key)
    }
  },
  render (h) {
    const { logo, title, action, content, extraContent, tabList, tabActiveKey } = this

    return (
      <div class='page-header'>
        <div class='detail'>
          {
            (logo || this.$slots.logo) &&
            (<div class='logo'>
              {logo || this.$slots.logo}
            </div>)
          }
          <div class='main'>
            <div class='row'>
              {
                (title || this.$slots.title) && <h1 class='title'>{title || this.$slots.title}</h1>
              }
              {
                (action || this.$slots.action) && <div class='action'>{action || this.$slots.action}</div>
              }
            </div>
            <div class='row'>
              {
                (content || this.$slots.content) && <div class='content'>{content || this.$slots.content}</div>
              }
              {
                (extraContent || this.$slots['extra-content']) && <div class='extra-content'>{extraContent || this.$slots['extra-content']}</div>
              }
            </div>
          </div>
        </div>
        {
          tabList && tabList.length &&
          <el-tabs class='tabs' value={tabActiveKey} onTabClick={this.onChange}>
            {
              tabList.map(item => {
                return (<el-tab-pane label={item.tab} name={item.key} />)
              })
            }
          </el-tabs>
        }
      </div>
    )
  }
}
</script>

<style lang="scss">
@import '~@assets/element/scss/theme.scss';

.page-header {
  background: $component-background;
  padding: 16px 32px 0 32px;
  border-bottom: $border-width-base $border-style-base $border-color-split;

  .detail {
    display: flex;
    margin-left: -8px;
  }

  .row {
    display: flex;
  }

  .tabs {
    margin: 0 0 -16px -8px;

    /deep/ .el-tabs__header {
      // border-bottom: $border-width-base $border-style-base $border-color-split;
      .el-tabs__nav-wrap::after {
        height: 0;
      }
    }
  }

  .logo {
    flex: 0 1 auto;
    margin-right: 16px;
    padding-top: 1px;
    > img {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-base;
      display: block;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    color: $heading-color;
  }

  .action {
    margin-left: 56px;
    min-width: 266px;

    /deep/ {
      .ant-btn-group:not(:last-child),
      .ant-btn:not(:last-child) {
        margin-right: 8px;
      }

      .ant-btn-group > .ant-btn {
        margin-right: 0;
      }
    }
  }

  .title,
  .action,
  .content,
  .extra-content,
  .main {
    flex: auto;
  }

  .title,
  .action {
    margin-bottom: 16px;
  }

  .logo,
  .content,
  .extra-content {
    margin-bottom: 16px;
  }

  .action,
  .extra-content {
    text-align: right;
  }

  .extra-content {
    margin-left: 88px;
    min-width: 242px;
  }
}

@media screen and (max-width: $screen-xl) {
  .page-header {
    .extra-content {
      margin-left: 44px;
    }
  }
}

@media screen and (max-width: $screen-lg) {
  .page-header {
    .extra-content {
      margin-left: 20px;
    }
  }
}

@media screen and (max-width: $screen-md) {
  .page-header {
    .row {
      display: block;
    }

    .action,
    .extra-content {
      margin-left: 0;
      text-align: left;
    }
  }
}

@media screen and (max-width: $screen-sm) {
  .page-header {
    .detail {
      display: block;
    }
  }
}

@media screen and (max-width: $screen-xs) {
  .page-header {
    .action {
      /deep/ {
        .ant-btn-group,
        .ant-btn {
          display: block;
          margin-bottom: 8px;
        }
        .ant-btn-group > .ant-btn {
          display: inline-block;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
