<script type="text/javascript">
export default {
  props: {
    value: {
      default: ''
    }
  },
  render: function (createElement) {
    let self = this
    return createElement('input', {
      attrs: { // 节点属性
        placeholder: '搜索你想要的车辆',
        type: 'text'
      },
      class: {
        highlight: false
      },
      domProps: {
        value: self.value
      },
      on: {
        input: function (e) {
          self.$emit('input', e.target.value)
          // console.log(self.value)
        },
        focus: function () {
          // self.set(self, 'highlight', true)
          self.$el.classList.add('highlight')
        },
        blur: function () {
          self.$el.classList.remove('highlight')
        }
      }
    })
  }
}
</script>
<style type="text/css">
  .highlight{
    border: 1px solid #ff6633;
  }
</style>
