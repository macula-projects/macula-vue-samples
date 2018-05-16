
<script>
export default {
  name: 'ant-icon',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  render: function (h) {
    const { type } = this
    return h('i', {
      class: ['anticon', `anticon-${type}`],
      on: this.$listeners
    })
  }
}
</script>
