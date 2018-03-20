<template>
  <div id="pic">
    <div id="boxlist">
      <div class="box"></div>
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box"></div>
      <div class="box1"></div>
      <div class="box3"></div>
      <div class="box"></div>
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box"></div>
      <div class="box1"></div>
      <div class="box3"></div>
    </div>
  </div>
</template>

<script>
  import {startMove} from '../assets/js/move'
  export default {
    name: 'pic',
    data () {
      return {
        taocan_arr: []
      }
    },
    methods: {
      little_up (el) {
        var ele = el.currentTarget
        ele.setAttribute('style', 'box-shadow:0px 0px 10px 0px #ff6633;')
        startMove(ele, {'margin-top': -5})
      },
      little_down (el) {
        var ele = el.currentTarget
        ele.setAttribute('style', 'box-shadow:none;')
        startMove(ele, {'margin-top': 0})
      }
    },
    components: {

    },
    mounted () {
      /* this.$http.get('http://47.94.107.160:8888/mysql?tablename=taocan').then((res)=>{
        this.taocan_arr = res.data;
      }).catch((res) => {
        console.log(res);
      }) */
      /* 获取数组中某值的所有下标 */

    }
  }

 /*
  function f(arr,index = 0) {
    let target_number = arr[index].line + arr[index+1].line;
    if( target_number == 5 ){
      new_arr.push(arr[index]);
      new_arr.push(arr[index+1]);
      f(arr,index+2);
    }else if (target_number < 5){
      target_number = target_number + arr[index+2].line;

    }

  } */
</script>

<style>
  @import "../assets/css/pic.css";
</style>
