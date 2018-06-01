<template>
  <div>
    <page-body>
      Welcome to Macula UI Pro
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
import PageBody from '@components/element/PageBody'

export default {
  name: 'index',
  components: {
    [PageBody.name]: PageBody
  },
  data () {
    return {
      msg: '首页'
    }
  }
}
</script>
