<template>
  <div id="app">
    <el-container direction="vertical">
      <mu-header />
      <el-container>
        <mu-aside />
        <mu-main />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Container } from 'element-ui'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Main from '../components/Main'

export default {
  name: 'layout-admin',
  components: {
    [Container.name]: Container,
    [Main.name]: Main,
    [Aside.name]: Aside,
    [Header.name]: Header
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.el-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .el-container {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
