<template>
  <div>
    <page-header
      title="查询表格"
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
      <el-table
        :data='tableData3'
        height='100%'
        border
        style='width: 100%'>
        <el-table-column prop='date' label='日期' width='180'/>
        <el-table-column prop='name' label='姓名' width='180'/>
        <el-table-column prop='address' label='地址'/>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          background
          :total="tableData3.length">
        </el-pagination>
      </div>
    </page-body>
  </div>
</template>

<routeMeta>
  {
    title: '表格',
    layout: 'layout-front'
  }
</routeMeta>

<script>
import { Table, TableColumn, ButtonGroup, Button, Row, Col, Pagination } from 'element-ui'
import PageHeader from '@components/element/PageHeader'
import PageBody from '@components/element/PageBody'

const tabList = [
  {
    key: 'detail',
    tab: '详情'
  },
  {
    key: 'rule',
    tab: '规则'
  }
]
const tableData3 = [
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }
]

export default {
  components: {
    [ButtonGroup.name]: ButtonGroup,
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [PageHeader.name]: PageHeader,
    [PageBody.name]: PageBody,
    [Row.name]: Row,
    [Col.name]: Col,
    [Pagination.name]: Pagination
  },
  data () {
    return {
      tabList: tabList,
      headerTabKey: 'detail',
      tableData3: tableData3
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/element/scss/theme.scss';
.extra-content {
  .heading {
    color: $heading-color;
    font-size: 20px;
  }
  .text-secondary {
    color: $text-color-secondary;
  }
}
.pagination {
  float: right;
  margin-top: 24px;
}
</style>
