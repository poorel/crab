<template>
  <div id="home">
    <div class="bg">
      <div class="w">
        <p class="bounceInLeft animated">I'll be back!<br/><br/></p>
      </div>
    </div>
    <div class="taocan w">
      <h2>超值套餐</h2>
      <ul id="carsPanel">
        <li v-for="(val,index) in taocan_arr" v-on:mouseenter="little_up($event)" v-on:mouseleave="little_down($event)">
          <router-link :to="{path:'/single',query:{'singleid':val.singleid}}">
            <div class="li-up">
              <a href="#" target="_blank">
                <img :src=val.imgsrc>
              </a>
            </div>
            <div class="li-down">
              <p>
                <a href="#" target="_blank">
                  {{val.name}}
                </a>
              </p>
              <p>
                <span>{{val.brand}}</span>
                <span>丨</span>
                <span>{{val.location}}</span>
                <span>丨</span>
                <span>库存{{val.inventory}}</span>
              </p>
              <div>
                <span>￥{{val.price}}</span>
                <a href="#" target="_blank">
                  立即购买
                </a>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="abstract w">
      <h2>兴化大闸蟹</h2>
      <p class="little">蟹螯即金液，糟丘是蓬莱，且须饮美酒，乘月醉高台。--李白(唐)</p>
      <p class="abstract_content">兴化大闸蟹，江苏省兴化市特产，中国地理标志产品。兴化市内湖荡密布，河道纵横交织，湖荡内水草丰美，为优质淡水螃蟹的生长提供了得天独厚的良好条件。有4乡镇被授予<i>“中国河蟹之乡”</i>称号，兴化市被授予<i>“中国河蟹养殖第一县”</i>称号。所产大闸蟹具有“青壳、白肚、金爪、黄毛、博螯、捷足”的特点，脂膏丰满纯正、肉质玉白爽嫩、蟹黄晶红油润、入口鲜香溢甜，深受海内外消费者的青睐。多个品牌的大闸蟹入选“中国十大名蟹”、荣获“中国名蟹金奖”</p>
    </div>
    <div class="sketch w">
      <h2>产地简图</h2>
      <p class="little">“半湾活水千江月，一粒沉沙万斛珠”--郑板桥(清)</p>
      <ul>
        <li>
          <img src="../assets/images/place.jpg">
        </li>
        <li>
          <img src="../assets/images/place.jpg">
        </li>
        <li>
          <img src="../assets/images/place.jpg">
        </li>
        <li>
          <img src="../assets/images/place.jpg">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {startMove} from '../assets/js/move'
  export default {
    name: 'home',
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
      this.$http.get('http://47.94.107.160:8888/mysql?tablename=taocan').then((res) => {
        this.taocan_arr = res.data
      }).catch((res) => {
        console.log(res)
      })
    }
  }
</script>

<style>
  @import "../assets/css/home.css";
</style>
