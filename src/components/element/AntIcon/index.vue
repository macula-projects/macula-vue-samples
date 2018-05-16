<template>
  <i :class="class1(type)"></i>
</template>

<script>
export default {
  name: 'ant-icon',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    class1: function (type) {
      return 'anticon anticon-' + type
    }
  }
}
</script>
