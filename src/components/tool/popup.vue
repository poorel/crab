<template>
  <transition enter-active-class="animated fadeInUp"
              leave-active-class="animated fadeOutDown">
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
      this.popup_content = popupContent
      this.view = true
      setTimeout(() => {
        this.view = false
      }, 1500)
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
