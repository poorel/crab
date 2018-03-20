<template>
  <div id="single">
    <div class="carIntroduce w">
      <div class="title">
        <span>当前位置：</span>
        <span>青蟹</span>
        <span class="subordinate">></span>
        <span>套餐详情页</span>
      </div>
      <div class="introduce">
        <div class="left-img">
          <ul class="carousel">
            <li>
              <img :src='carousel[borderindex]'>
            </li>
          </ul>
          <ul class="indicator">
            <li v-for="(val,index) in carousel" :class={border:border(index)}>
              <img :src=val v-on:click="select_img($event)" :index=index>
            </li>
          </ul>
          <button class="btl" type="button" v-on:click="left1"></button>
          <button class="btr" type="button" v-on:click="right1"></button>
        </div>
        <div class="right-message">
          <div class="message">
            <div class="conciseMessage">
              <h2>{{singlemessage[0]}}</h2>
              <p class="price_red">
                <span>价格</span>
                <span>{{singlemessage[1]}}</span>
              </p>
              <div class="discount">
                <p v-for="(val,index) in singlemessage[2]">
                  <span>促销{{index+1}}</span>
                  <span>{{val}}</span>
                </p>
              </div>
            </div>
            <div class="share">
              <span class="iconfont icon-fenxiang1">&nbsp;分享</span>
              <!--<span class="iconfont icon-yanjing">&nbsp;791</span>-->
              <div class="shareBox">
                <div class="bdsharebuttonbox">
                  <a title="分享到腾讯微博" href="#" class="bds_sqq iconfont icon-QQ" data-cmd="sqq" style="color:#03a4db;"></a>
                  <a title="分享到QQ空间" href="#" class="bds_qzone iconfont icon-iconfontqqkongjian" data-cmd="qzone" style="color:#e9aa3b;"></a>
                  <a title="分享到新浪微博" href="#" class="bds_tsina iconfont icon-xinlang" data-cmd="tsina" style="color:#d15b4f;"></a>
                  <a title="分享到腾讯微博" href="#" class="bds_tqq iconfont icon-tengxunweibo" data-cmd="tqq" style="color:#27abe0;"></a>
                  <a title="分享到微信" href="#" class="bds_weixin iconfont icon-slideBar1" data-cmd="weixin" style="color:#6cb141;"></a>
                  <a title="一键分享" href="#" class="bds_mshare iconfont icon-fenxiang2" data-cmd="mshare" style="color:#3bb79b;"></a>
                </div>

              </div>

            </div>
          </div>
          <div class="price">
            <input type="text" v-model="number" readonly="readonly"/>
            <p>
              <span class="iconfont icon-biaotixialajiantouyixiala" v-on:click="up1"></span>
              <span class="iconfont icon-biaotixialajiantouweixiala" v-on:click="down1"></span>
            </p>
            <button type="button" v-on:click="user">加入购物车</button>
            <button type="button" v-on:click="buy">立即购买</button>
          </div>
          <div class="state">
            <span class="state_title">保障</span>
            <p>
              <span class="iconfont icon-zhengpinbaozhang"></span>
              <span>正品保障</span>
            </p>
            <p>
              <span class="iconfont icon-qiache"></span>
              <span>生鲜专递</span>
            </p>
            <p>
              <span class="iconfont icon-cancer"></span>
              <span>现捞现发</span>
            </p>
          </div>
          <div class="addre">
            <span class="state_title">地址</span>
            <v-distpicker></v-distpicker>
            <input type="text" placeholder="请输入详细住址" id="detail_addre"/>
          </div>
        </div>
        <div class="QRcode">
          <img src="../assets/images/QAcode.png">
        </div>
      </div>
      <div class="content">
        <div class="side-left">
          <h2>&nbsp;&nbsp;&nbsp;&nbsp;精品推荐</h2>
          <ul>
            <li v-for="(val,index) in recommendation" >
              <router-link :to="{path:'/single',query:{'singleid':val.singleid}}" @click.native="flushCom">
              <img :src=val.imgsrc>
              <p class="recom_li_title">{{val.name}}</p>
              <p class="contentPrice">
                <span>来源:{{val.location}}</span><br/>
                <span>价格:{{val.price}}</span>
              </p>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="side-right" v-once>
          <div class="flow-header" id="flx">
            <ul class="detailNav">
              <li>基本信息</li>
              <li>商品评价(待商榷)</li>
              <li>买家须知</li>
              <li>产品保障</li>
            </ul>
          </div>
          <div class="baseMessage">
            <h2>基本信息</h2>
            <div>
              <p class="odd">
                <span>品牌:</span>
                <span>兴化大闸蟹</span>
              </p>
              <p class="even">
                <span>商品名称:</span>
                <span>兴化大闸蟹现货 公蟹4两 母蟹2.8两 4对8只装</span>
              </p>
              <p class="odd">
                <span>型号:</span>
                <span>精装版</span>
              </p>
              <p class="even">
                <span>商品产地:</span>
                <span>江苏省兴化市合陈镇桂山村</span>
              </p>
            </div>
          </div>
          <div class="carDetail">
            <h2>商品评价</h2>
            <div>
              这网页做的真丑
            </div>
          </div>
          <div class="buyCar">
            <h2>买家须知</h2>
            <div>
              <img src="../assets/images/buy1.jpg">
            </div>
          </div>
          <div class="financialCase">
            <h2>产品保障</h2>
            <div>
              <img src="../assets/images/buy2.jpg" />
              <img src="../assets/images/buy3.jpg" />
              <img src="../assets/images/buy4.jpg" />
              <img src="../assets/images/buy5.jpg" />
              <img src="../assets/images/buy6.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import VDistpicker from 'v-distpicker'
export default {
  name: 'single',
  data () {
    return {
      province: '',
      city: '',
      area: '',
      img_index: 0,
      carousel: [],
      borderindex: 0,
      number: 1,
      singlemessage: [],
      id: 1,
      recommendation: []
    }
  },
  methods: {
    ...mapActions(['addcarts', 'clear']),
    flushCom: function () {
      // router是路由实例,例如:var router = new Router({})
      // router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
      this.$router.go(0)
    },
    // 账户是否已登陆
    user () {
      this.getUser ? this.addcarts({'single': this.id, 'number': this.number}) : this.$router.push({path: '/login'})
    },
    // 控制轮播小图边框
    border (x) {
      var index = this.borderindex
      if (x == index) {
        return true
      } else {
        return false
      }
    },
    left1 () {
      this.borderindex > 0 ? this.borderindex-- : this.borderindex = 0
    },
    right1 () {
      let uplimit = this.carousel.length - 1
      this.borderindex < uplimit ? this.borderindex++ : this.borderindex = uplimit
    },
    up1 () {
      this.number++
    },
    down1 () {
      this.number > 0 ? this.number-- : this.number = 0
    },
    buy () {
      this.user()
      var user = this.getUser.name
      this.$router.push({path: '/checkout', query: {user}})
    },
    select_img (el) {
      var ele = el.currentTarget
      this.borderindex = ele.getAttribute('index')
    }
  },
  components: {
    VDistpicker
  },
  computed: {
    ...mapGetters(['getUser', 'getLoding'])
  },
  mounted () {
    this.id = this.$route.query.singleid
    if (!this.id) {
      this.$router.push({path: '/single?singleid=001'})
    }
    this.$http.get('http://47.94.107.160:8888/single?singleid=' + this.id).then((res) => {
      // 折扣参数
      var dist = []
      if (res.data[0].dist1) {
        dist.push(res.data[0].dist1)
      }
      if (res.data[0].dist2) {
        dist.push(res.data[0].dist2)
      }
      if (res.data[0].dist3) {
        dist.push(res.data[0].dist3)
      }
      // 轮播参数
      var index00 = res.data[0].pic.search(/\d+\.jpg/)
      var index99 = res.data[0].pic.length - 1
      var headed = res.data[0].pic.slice(0, index00)// 头
      var footer = '.jpg'// 尾
      var numbottom = res.data[0].pic.charAt(index00)// 初始数字
      var numtop = res.data[0].pic.charAt(index99)// 末尾数字
      for (numbottom; numbottom <= numtop; numbottom++) {
        this.carousel.push(headed + numbottom + footer)
      }
      this.singlemessage = [res.data[0].name, res.data[0].price, dist]
    }).catch((res) => {
      // 失败直接跳转走
      console.log(res)
    })
    this.$http.get('http://47.94.107.160:8888/mysql?tablename=taocan').then((res) => {
      this.recommendation = res.data
      // console.log(this.recommendation);
    }).catch((res) => {
      console.log(res)
    })
  }
}
</script>

<style>
  @import "../assets/css/single.css";
</style>