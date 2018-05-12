<template>
  <el-aside>
    <!--导航菜单-->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
        @open="handleopen" @close="handleclose" @select="handleselect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
        unique-opened router :collapse="collapsed">
      <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <el-submenu :index="index+''" :key="index" v-if="!item.leaf">
          <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
            {{child.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf&&item.children.length>0" :key="index" :index="item.children[0].path">
          <i :class="item.iconCls"></i>{{item.children[0].name}}
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import {Aside, Menu, Submenu, MenuItem} from 'element-ui'
import service from '../service'

export default {
  name: 'MuAside',
  components: {
    [Aside.name]: Aside,
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    handleopen () {
      // console.log('handleopen');
    },
    handleclose () {
      // console.log('handleclose');
    },
    handleselect: function (a, b) {
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  .el-aside {
    flex:0 0 230px;
    width: 230px;
    // position: absolute;
    // top: 0px;
    // bottom: 0px;
    .el-menu{
      height: 100%;
    }
    .collapsed{
      width:60px;
      .item{
        position: relative;
      }
      .submenu{
        position:absolute;
        top:0px;
        left:60px;
        z-index:99999;
        height:auto;
        display:none;
      }
    }
  }
}
</style>
