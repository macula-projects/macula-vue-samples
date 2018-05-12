<template>
  <i class="anticon anticon-{{type}}"></i>
</template>

<script>
export default {
  name: 'ant-icon',
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>