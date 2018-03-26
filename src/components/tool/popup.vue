<template>
  <transition enter-active-class="animated fadeInUp"
              leave-active-class="animated fadeOutDown" :duration="1000">
  <div id="popup" v-show="view">
    {{popup_content}}
  </div>
  </transition>
</template>
<script>
export default {
  name: 'popup',
  data () {
    return {
      view: false,
      popup_content: '传参啊,大哥！'
    }
  },
  methods: {
    selfPOP: function (popupContent) {
      let message = arguments /* arguments为传入的参数数组 */
      let that = this
      let pop = function (val) {
        return new Promise(function (resolve) {
          that.popup_content = val
          that.view = true
          setTimeout(() => { that.view = false }, 1500) // resolve()
          setTimeout(() => { resolve() }, 2500)
        })
      }

      async function continuousPOP () {
        for (let val of message) {
          await pop(val) // 返回值为resolve中的值
        }
      }
      continuousPOP()
    }
  },
  mounted () {

  }
}
</script>
<style>
  #popup{
    position: fixed;
    padding: 20px 50px;
    font-size: 18px;
    color: white;
    background: rgba(0,0,0,0.7);
    top: 36%; left: 50%;
    /*-webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);*/
    text-align: center;
  }
</style>
