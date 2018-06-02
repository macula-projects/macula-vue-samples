<template>
    <div class="page-body">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'PageBody',
  componentName: 'PageBody'
}
</script>

<style lang="scss">
.page-body {
  margin: 15px;
  .el-pagination {
    float: right;
    margin-bottom: 25px;
  }
  .table-header {
    .el-form-item {
      margin-bottom: 0;
      &__label {
        margin-bottom: 0;
      }
    }
    .search {
      display: flex;
    }
    margin-bottom: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  .table-footer {
    margin: 15px 0 25px 0;
    height: 50px;
    .actions {
      float: left;
    }
    .el-pagination {
      margin: 0;
    }
  }
  .el-table__header {
    thead > tr > th {
      color: #000;
      background: #f5f7fa
    }
  }
}
</style>
