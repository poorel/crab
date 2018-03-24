<template>
  <div id="footer1">
    <div class="w">
      <div class="footer_message">
        <slot name="test" address="江苏省泰州市兴化市合陈镇桂山村"></slot> <!--插槽-->
        <a href="mailto:1010097590@qq.com?subject=crab商务通知">
          <span class="iconfont icon-cmstubiaozitihua15"></span>
          <span>1010097590@qq.com</span>
        </a>
        <p>
          <span class="iconfont icon-icon32206"></span>
          <span>my phone number: 17312129390</span>
        </p>
      </div>
      <div class="manifesto animated rotateIn infinite">
        <i class="">{{love}}</i>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'footer1',
  props: {
    love: {
      type: String,
      default: '努力工作，热爱生活',
      required: true
    }
  }
}
</script>

<style>
  @import "../assets/css/footer.css";
</style>
