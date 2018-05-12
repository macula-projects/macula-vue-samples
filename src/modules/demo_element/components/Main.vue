<template>
  <el-main>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-main>
</template>

<script>
import {Main} from 'element-ui'

export default {
  name: 'MuMain',
  components: {
    [Main.name]: Main
  }
}
</script>

<style lang="scss" scoped>
@import "vars.scss";
.el-container {
  .el-main {
    // background: #f1f2f7;
    flex:1;
    // position: absolute;
    // right: 0px;
    // top: 0px;
    // bottom: 0px;
    // left: 230px;
    overflow-y: scroll;
    padding: 20px;
    .breadcrumb-container {
      //margin-bottom: 15px;
      .title {
        width: 200px;
        float: left;
        color: #475669;
      }
      .breadcrumb-inner {
        float: right;
      }
    }
    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>
