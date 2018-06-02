<template>
  <div>
    <page-header title="查询表格">
      <ant-icon type="question-circle-o" slot='logo'/>
      <div slot="action">
        <el-button type="primary">新建</el-button>
      </div>
    </page-header>
    <page-body>
      <div class='table-header'>
        <div class='search'>
          <el-form v-if="expandForm" ref="form" label-position='left' :model="form" @submit.native="handleSearch">
            <el-row :gutter="8">
              <el-col :xs="24" :sm="12">
                <el-form-item label="规则编号" prop="no">
                  <el-input v-model="form.no" placeholder="请输入"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="使用状态" prop="status">
                  <el-select v-model="form.status" placeholder="请选择" :style="{width: '100%'}">
                    <el-option value="0" label="关闭" />
                    <el-option value="1" label="运行中" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="8">
              <el-col :xs="24" :sm="12">
                <el-form-item label="更新日期" prop="updatedAt">
                  <el-date-picker v-model="form.updatedAt" :style="{width: '80%'}" placeholder="请输入更新日期"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="使用状态" prop="status3">
                  <el-select v-model="form.status3" placeholder="请选择" :style="{width: '100%'}">
                    <el-option value="0" label="关闭" />
                    <el-option value="1" label="运行中" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div :style="{overflow: 'hidden'}">
              <span :style="{float: 'right', marginBottom: '24px'}">
                <el-button type="primary" native-type="submit">
                  查询
                </el-button>
                <el-button :style="{marginLeft: '8px'}" @click="handleFormReset">
                  重置
                </el-button>
                <a :style="{marginLeft: '8px'}" href="javascript:;" @click="toggleForm">
                  收起 <ant-icon type="up" />
                </a>
              </span>
            </div>
          </el-form>
          <el-form v-else ref="form" :model="form" inline @submit.native="handleSearch">
            <el-form-item label="规则编号" prop="no">
              <el-input v-model="form.no" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="使用状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择" :style="{width: '100%'}">
                <el-option value="0" label="关闭" />
                <el-option value="1" label="运行中" />
              </el-select>
            </el-form-item>
            <span class="submit-buttons">
              <el-button type="primary" native-type="submit">
                查询
              </el-button>
              <el-button :style="{marginLeft: '8px'}" @click="handleFormReset">
                重置
              </el-button>
              <a :style="{marginLeft: '8px'}" href="javascript:;" @click="toggleForm">
                展开 <ant-icon type="down" />
              </a>
            </span>
          </el-form>
        </div>
        <div class='action'>
          <el-button type="default">批量审批</el-button>
        </div>
      </div>

      <el-table
        :data='tableData3'
        height='100%'
        border
        style='width: 100%'>
        <el-table-column type="selection" width="55"/>
        <el-table-column prop='date' label='日期' width='180'/>
        <el-table-column prop='name' label='姓名' width='180'/>
        <el-table-column prop='address' label='地址'/>
      </el-table>
      <div class="table-footer">
        <div class="action">
          <el-button type="default">批量审批</el-button>
          <el-button type="default">批量审批</el-button>
        </div>
        <el-pagination
          layout="total, prev, pager, next, sizes"
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
import { Table, TableColumn, Form, FormItem, DatePicker, Select, Option, ButtonGroup, Button, Input, InputNumber, Row, Col, Pagination } from 'element-ui'
import PageHeader from '@components/element/PageHeader'
import PageBody from '@components/element/PageBody'
import AntIcon from '@components/element/AntIcon'

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
  },
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
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [DatePicker.name]: DatePicker,
    [ButtonGroup.name]: ButtonGroup,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [PageHeader.name]: PageHeader,
    [PageBody.name]: PageBody,
    [AntIcon.name]: AntIcon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Pagination.name]: Pagination
  },
  data () {
    return {
      expandForm: false,
      form: {
        no: '',
        status: '',
        number: '',
        updatedAt: '',
        status3: '',
        status4: ''
      },
      tableData3: tableData3
    }
  },
  methods: {
    handleFormReset () {
      // const formRef = this.$refs.form
      // formRef.resetFields()
      // this.$store.dispatch('rule/fetch', {})
    },
    toggleForm () {
      this.expandForm = !this.expandForm
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
</style>
