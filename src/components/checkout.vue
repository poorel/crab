<template>
  <div id="checkout" class="w">
    <div class="title">
      <span>当前位置：</span>
      <span>青蟹</span>
      <span class="subordinate">></span>
      <span>商品结算</span>
    </div>
    <div class="checkout_title">
      <span class="iconfont icon-dui"></span><!--正方边框-->
      <span class="commodity_name">商品信息</span>
      <span class="dist_select">优惠方案</span>
      <span class="unit_price">单价</span>
      <span class="quantity">数量</span>
      <span class="total_prices">金额</span>
      <span class="dist_price">折后金额</span>
      <span class="run">操作</span>
    </div>
    <div class="commodity_list">
      <ul>
        <li v-for="(val,index) in checkoutlist">
          <span :class="{'iconfont' :true,'icon-dui': val.check}" v-on:click="checkToggle(index)"></span><!--正方边框-->
          <router-link :to="{path:'/single',query:{'singleid': val.id}}"><!--表单+id-->
            <img :src=val.pic>
          </router-link>
          <router-link :to="{path:'/single',query:{'singleid': val.id}}"><!--表单+id-->
            <p class="title_a">{{val.name}}</p>
          </router-link>
          <div class="dist_all">
            <!--优惠-->
            <label v-for="(val,index$1) in val.dist" v-on:click="discount(index,val,index$1)"><span :class="{checked :  distSelect[index] == index$1 }"></span>折扣{{index$1+1}}&nbsp;{{val}}</label>
          </div>
          <span class="unit">￥{{val.price}}</span>
          <p class="num">
            <span v-on:click="down(index)">-</span>
            <input type="text" :value=val.number readonly="readonly"/>
            <span v-on:click="up(index)">+</span>
          </p>
          <span class="total">￥{{(val.number*val.price)}}</span>
          <span :class="{'animated': bounce[index],'bounce':bounce[index]}" class="dist b ">￥{{(val.number * val.price * val.rate / 10 - val.saleprice)}}</span>
          <p class="operation">
            <span v-on:click="dec(val.id,index)">删除</span>
          </p>
        </li>
        <!--收件地址-->
        <div class="address_list">
          <h3>地址列表(最多保存５条收货地址)</h3>
          <p>
            <span>&nbsp;收货人</span>
            <span>&nbsp;收货地址</span>
            <span>&nbsp;联系电话</span>
            <span>&nbsp;操作</span>
          </p>
          <ul>
            <li v-for="(val,index) in address" :class="{select:index==addselect}">
              <input type="text" readonly :value=val.name>
              <input type="text" readonly :value=val.addres>
              <input type="text" readonly :value=val.receiver>
              <button type="button" v-on:click="selectaddress(index)">选择</button>
            </li>
            <p v-if="!address">您还未添加收获地址，请前往个人中心管理~</p>
          </ul>
        </div>
      </ul>
      <div class="total_checkout">
        <button type="button" v-on:click="addOrder">结算</button>
        <span class="total_all">￥{{allprice}}</span>
        <span>合计(免运费)</span>
      </div>
    </div>
    <transition enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutDown">
      <popup v-show="view" :popup_content="view_content"></popup>
    </transition>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'checkout',
  data () {
    return {
      checkoutlist: [], // 商品数据集合
      distSelect: [], // 多种优惠0表示未开启dist1[x]代表第几个产品，其数值0.1.2.3代表其不同的折扣方式
      bounce: [],
      addselect: 0,
      address: false, // 地址数据集合
      view: false, // pop
      view_content: '' // pop
    }
  },
  methods: {
    pop (x) {
      this.view_content = x
      this.view = true
      setTimeout(() => {
        this.view = false
      }, 1500)
    },
    // address
    selectaddress (x) {
      this.addselect = x
    },
    ...mapActions(['deccarts', 'clear']),
    // check
    checkToggle (index) {
      this.checkoutlist[index].check ? this.$set(this.checkoutlist[index], 'check', false) : this.$set(this.checkoutlist[index], 'check', true)
    },
    dec (singid, index) {
      this.deccarts(singid)
      this.checkoutlist.splice(index, 1)
    },
    discount (x, y, z) {
      this.bounce[x] = 1// 添加类名时会触发一次
      setTimeout(() => { this.bounce = [] }, 900)// 我的天本行动画效果无效，却能控制折扣按钮颜色
      var re1 = new RegExp('[\\u4e00-\\u9fa5](\\d+)[\\u4e00-\\u9fa5]{2}(\\d+)', 'ig')
      var re2 = new RegExp('[\u4e00-\u9fa5]*(\\d{1})[\u6298]{1}[\u4e00-\u9fa5]*', 'ig')
      var result1 = re1.test(y)// true为方式1
      var result2 = re2.test(y)// true为方式2
      if (result1) {
        var targetVal = y.replace(re1, '$1')
        var saleVal = y.replace(re1, '$2')
        var sale = parseInt(this.checkoutlist[x].number) * parseInt(this.checkoutlist[x].price) >= parseInt(targetVal)
        if (sale) {
          this.$set(this.checkoutlist[x], 'saleprice', parseInt(saleVal))
          this.$set(this.checkoutlist[x], 'rate', 10)
          this.$set(this.distSelect, x, z)
        } else {
          this.pop('您还未满足折扣要求')
        }
      } else if (result2) {
        var rate = y.replace(re2, '$1')
        this.$set(this.checkoutlist[x], 'saleprice', 0)
        this.$set(this.checkoutlist[x], 'rate', rate)
        this.$set(this.distSelect, x, z)
      } else {
        // 第三种优惠方案
      }
    },
    up (x) {
      this.checkoutlist[x].number++
      this.bounce[x] = 1// 添加类名时会触发一次
      setTimeout(() => { this.bounce = [] }, 900)
    },
    down (x) {
      if (this.checkoutlist[x].number > 1) {
        this.bounce[x] = 1// 添加类名时会触发一次
        setTimeout(() => { this.bounce = [] }, 900)
        this.checkoutlist[x].number--
      }
    },
    addOrder () {
      if (this.allprice & this.address) {
        let user = this.$router.history.current.query.user
        let addressid = this.address[this.addselect].id
        let commodityPool = this.checkoutlist.filter(function (val) {
          return val.check
        })
        commodityPool = JSON.stringify(commodityPool)
        this.$http.get(`http://47.94.107.160:8888/orders?phonecode=${user}&arr=${commodityPool}&type=0&address=${addressid}`).then((res) => {
          JSON.parse(commodityPool).forEach(function (val) {
            this.deccarts(val.id)
          }, this)
          this.checkoutlist = this.checkoutlist.filter(function (val) {
            return !val.check
          })
          this.pop('添加成功，您可以在个人中心查看啦~')
        }).catch((err) => {
          console.log(err)
        })
      } else if (!this.allprice) {
        this.pop('请勾选您想要结算的商品')
      } else {
        this.pop('您还未添加收件地址，请前往个人中心管理')
      }
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getLoding']),
    allprice () {
      // 在计算属性中无法监测优惠活动
      var allp = 0
      this.checkoutlist.forEach(function (val, index) {
        if (val.check) {
          allp += val.number * val.price * val.rate / 10 - val.saleprice
        }
      })
      return allp
    }
  },
  mounted () {
    var user = this.$router.history.current.query.user
    var singleArr = []
    // var carlist = this.getUser.commodity;//刷新，等候状态管理太慢了.直接从router获取用户
    var commodity = window.localStorage.getItem(user)
    if (commodity) {
      var carlist = JSON.parse(commodity)
      carlist.forEach(function (val, index) {
        singleArr.push(parseInt(val.single))
      })
      var singleStr = JSON.stringify(singleArr.filter(val => parseInt(val) >= 0))
      if (singleStr.length) {
        // 获取购物车商品
        this.$http.get(`http://47.94.107.160:8888/checkout?phonecode=${user}&single=${singleStr}`).then((res) => {
          if (res.data == 'login') {
            this.pop('请先登陆')
          } else {
            res.data.forEach(function (val, index) {
              // 图片处理
              index = val.pic.indexOf('.jpg') + 4
              val.pic = val.pic.slice(0, index)
              val.dist = []
              // 折扣处理
              val.disprice = 0
              if (val.dist1) {
                val.dist.push(val.dist1)
                delete val.dist1
              } else {
                delete val.dist1
              }
              if (val.dist2) {
                val.dist.push(val.dist2)
                delete val.dist2
              } else {
                delete val.dist2
              }
              if (val.dist3) {
                val.dist.push(val.dist3)
                delete val.dist3
              } else {
                delete val.dist3
              }
              // 数量添加
              for (let a = 0; a < carlist.length; a++) {
                if (parseInt(carlist[a].single) == val.id) {
                  val.number = carlist[a].number
                }
              }
              // 初始默认不勾选
              val.check = false
              // 减价，折扣率
              val.rate = 10
              val.saleprice = 0
              // url参数加密
              val.id = this.$getAES(val.id)
            }, this)
            this.checkoutlist = res.data
            console.log(this.checkoutlist)
          }
        }).catch((res) => {
          console.log(res)
        })
      }
    } else {
      this.pop('您还未添加商品哦~')
    }

    // 获取地址
    this.$http.get(`http://47.94.107.160:8888/address?phonecode=${user}&type=3`).then((res) => {
      res.data.length ? this.address = res.data : this.address = false
    }).catch((res) => {
      console.log(res)
    })
  }
}
</script>
<style>
  @import "../assets/css/checkout.css";
</style>
