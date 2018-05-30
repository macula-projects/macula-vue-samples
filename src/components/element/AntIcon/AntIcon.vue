
<script>
export default {
  name: 'AntIcon',
  componentName: 'AntIcon',
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
