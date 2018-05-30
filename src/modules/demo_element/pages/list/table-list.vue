<template>
  <div>
    <page-header
      title="查询表格"
    />
    <el-card>
      <el-table
        :data='tableData3'
        height='250'
        border
        style='width: 100%'>
        <el-table-column prop='date' label='日期' width='180'/>
        <el-table-column prop='name' label='姓名' width='180'/>
        <el-table-column prop='address' label='地址'/>
      </el-table>
    </el-card>
  </div>
</template>

<routeMeta>
  {
    title: '表格',
    layout: 'layout-front'
  }
</routeMeta>

<script>
import { Table, TableColumn, Card } from 'element-ui'
import PageHeader from '@components/element/PageHeader'
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Card.name]: Card,
    [PageHeader.name]: PageHeader
  },
  data () {
    return {
      tableData3: [
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
    }
  }
}
</script>
