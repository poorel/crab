<template>
<transition enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut" :duration="500">
  <div id="selectBox" v-show="visible">
    <div class="selectBox_bg"></div>
    <div class="box_content" :style="{width: width}">
      <div class="box_header">
        <h2>{{title}}</h2>
        <span class="iconfont icon-guanbi1" v-show="closeVisible" @click="close"></span>
      </div>
      <div class="box_message">
        <slot></slot>
      </div>
      <slot name="footer">
        <!--<div class="box_footer" solt="footer">
          <button type="button" class="make_sure">确认</button>
          <button type="button" class="cancel">取消</button>
        </div>-->
      </slot>
    </div>
  </div>
</transition>
</template>

<script type="text/javascript">
export default {
  name: 'selectBox',
  props: {
    width: {
      type: String,
      default: '360px'
    },
    title: {
      type: String,
      default: '信息'
    },
    visible: {
      type: Boolean,
      default: false
    },
    closeVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
      // 不sync 没有用console.log(this.visible)
    }
  }
}
</script>

<style type="text/css" scoped>
  @import "../../assets/css/selectBox.css";
</style>
