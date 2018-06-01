<template>
  <div>
    <page-header
      title="分析页面"
      :tab-list="tabList"
      :tab-active-key="headerTabKey">
      <img
        slot="logo"
        alt=""
        src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
      />
      <div slot="action">
        <el-button-group>
          <el-button>操作</el-button>
          <el-button>操作</el-button>
        </el-button-group>
        <el-button type="primary">主操作</el-button>
      </div>
    </page-header>
    <page-body>
      DashBoard
    </page-body>
  </div>
</template>

<routeMeta>
  {
    title: '后端首页',
    layout: 'layout-admin'
  }
</routeMeta>

<script>
import { ButtonGroup, Button, Row, Col } from 'element-ui'
import PageHeader from '@components/element/PageHeader'
import PageBody from '@components/element/PageBody'

export default {
  name: 'index',
  components: {
    [ButtonGroup.name]: ButtonGroup,
    [Button.name]: Button,
    [PageHeader.name]: PageHeader,
    [PageBody.name]: PageBody,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      msg: '分析页面'
    }
  }
}
</script>
