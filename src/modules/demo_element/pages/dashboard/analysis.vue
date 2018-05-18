<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/HelloWorld">HelloWorld</router-link>
  </div>
</template>

<routeMeta>
  {
    title: '后端首页',
    layout: 'layout-admin'
  }
</routeMeta>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '分析页面'
    }
  }
}
</script>
