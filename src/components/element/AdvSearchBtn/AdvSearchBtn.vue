<template>
  <div class="wrapper" :class="{ 'popover-open': popoverOpen }">
    <el-popover ref="search-popover" v-model="popoverOpen" popper-class="search-popover"
      placement="bottom-end" :offset="-3" :width=width>
      <slot />
    </el-popover>

    <div class="advSearchButton" v-popover:search-popover>
      <el-button type='success'><ant-icon type='filter'/>高级</el-button>
    </div>
  </div>

</template>

<script>
import { Popover, Button } from 'element-ui'
import AntIcon from '../AntIcon'

export default {
  name: 'AdvSearchBtn',
  componentName: 'AdvSearchBtn',
  components: {
    [Popover.name]: Popover,
    [Button.name]: Button,
    [AntIcon.name]: AntIcon
  },
  data () {
    return {
      popoverOpen: false
    }
  },
  props: {
    width: {
      type: String,
      default: '336'
    }
  }
}
</script>

<style lang="scss">
.search-popover {
  padding: 18px;
}
</style>

<style lang="scss" scoped>
.wrapper {
  display: inline-block;
}
.advSearchButton {
  width: 100%;
  height: 1;
  margin: 0 0 0 12px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  outline: none;
}
</style>
