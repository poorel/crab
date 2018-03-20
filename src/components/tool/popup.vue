<template>
  <div id="popup">
    {{popup_content}}
  </div>
</template>
<script>
  export default {
    name: 'popup',
    data () {
      return {

      }
    },
    props: ['popup_content'],
    methods: {

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