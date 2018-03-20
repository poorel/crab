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
          <span :class="{'iconfont' :true,'icon-dui': dui[index]}" v-on:click="duiif(index)"></span><!--正方边框-->
          <router-link :to="{path:'/single',query:{'singleid':1/*val.singleid*/}}"><!--表单+id-->
            <img :src=val.pic>
          </router-link>
          <router-link :to="{path:'/single',query:{'singleid':1/*val.singleid*/}}"><!--表单+id-->
            <p class="title_a">{{val.name}}</p>
          </router-link>
          <div class="dist_all">
            <!--优惠-->
            <label v-for="(val,index$1) in val.dist" v-on:click="discount(index,val)"><span :class="{checked :  dist1[index] == index$1+1 }"></span>折扣{{index$1+1}}&nbsp;{{val}}</label>
          </div>
          <span class="unit">￥{{val.price}}</span>
          <p class="num">
            <span v-on:click="down(index)">-</span>
            <input type="text" :value=val.number readonly="readonly"/>
            <span v-on:click="up(index)">+</span>
          </p>
          <span class="total">￥{{(val.number*val.price)}}</span>
          <span :class="{dist,'animated': bounce[index],'bounce':bounce[index]}">{{distp(index)}}</span>
          <p class="operation">
            <span v-on:click="dec(val.id)">删除</span>
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
            <li v-for="(val,index) in address" :addresid=val.id :class="{select:index==addselect}">
              <input type="text" readonly :value=val.name>
              <input type="text" readonly :value=val.addres>
              <input type="text" readonly :value=val.receiver>
              <button type="button" v-on:click="selectaddress(index)">选择</button>
            </li>
          </ul>
        </div>
      </ul>
      <div class="total_checkout">
        <button type="button" v-on:click="lastcheck">结算</button>
        <span class="total_all">￥{{allprice()}}</span>
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
        checkoutlist: [], // 每一个事件都应该自带下标
        dist1: [], // 多种优惠0表示未开启dist1[x]代表第几个产品，其数值0.1.2.3代表其不同的折扣方式
        bounce: [],
        dui: [], // 无法监听数组元素的变化
        addselect: 0,
        address: [],
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
      test (x) {
        if (this.dui[x] == 1) {
          return false
        } else {
          return true
        }
      },
      duiif (x) {
        if (this.dui[x]) {
          this.$set(this.dui, x, 0)
          // 添加属性this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
        } else {
          this.$set(this.dui, x, 1)
        }
      },
      dec (x) {
        this.deccarts(x)
        window.location.reload()
      },
      discount (x, y) {
        if (!y) {
          return
        }
        this.bounce[x] = 1// 添加类名时会触发一次
        setTimeout(() => { this.bounce = [] }, 900)// 我的天本行动画效果无效，却能控制折扣按钮颜色
        var re1 = new RegExp('[\\u4e00-\\u9fa5](\\d+)[\\u4e00-\\u9fa5]{2}(\\d+)', 'ig')
        var re2 = new RegExp('[9][\\u4e00-\\u9fa5]{1}', 'ig')
        var result1 = re1.test(y)// true为方式1
        var result2 = re2.test(y)// true为方式2
        if (result1) {
          this.dist1[x] = 1// this.dist2[x] = 0;this.dist3[x] = 0;
          this.checkoutlist[x].disprice = parseInt(this.checkoutlist[x].number * this.checkoutlist[x].price / RegExp.$1) * RegExp.$2
        } else if (result2) {
          this.dist1[x] = 2
        } else {
          this.dist1[x] = null// this.dist2[x] = 0;this.dist3[x] = 0;
          this.checkoutlist[x].disprice = 0
        }
      },
      distp (x) { // 目前性能不太好
        if (this.dist1[x] == 1) {
          return this.dist(x)
        } else if (this.dist1[x] == 2) {
          return Math.ceil(this.checkoutlist[x].number * this.checkoutlist[x].price * 0.9)
        } else {
          return this.checkoutlist[x].number * this.checkoutlist[x].price
        }
      },
      dist (x) {
        return this.checkoutlist[x].number * this.checkoutlist[x].price - this.checkoutlist[x].disprice
       /* 折扣价牵扯到的数据变化较多，每个商品均不相同，目前感觉使用数据驱动并不太合适，使用dom操作，或许更简单暴力 */
      },
      up (x) {
        this.checkoutlist[x].number++
        this.bounce[x] = 1// 添加类名时会触发一次
        setTimeout(() => { this.bounce = [] }, 900)
        if (this.dist1[x]) {
          this.discount(x)// this.checkoutlist[x].dist[0]
        }
      },
      down (x) {
        if (this.checkoutlist[x].number > 1) {
          this.bounce[x] = 1// 添加类名时会触发一次
          setTimeout(() => { this.bounce = [] }, 900)
          this.checkoutlist[x].number--
          if (this.dist1[x]) {
            this.discount(x, this.checkoutlist[x].dist[0])
          }
        }
      },
      allprice () {
        // 在计算属性中无法监测优惠活动
        var that = this
        var allp = 0
        this.checkoutlist.forEach(function (val, index) {
          if (that.dui[index]) {
            allp += that.distp(index)
          }
        })
        return allp
      },
      lastcheck () {
        if (this.allprice()) {
          // 订单页填充
          var that = this
          var arr = []// 订单信息
          var arr1 = []// 需要删除的
          var address = document.querySelector('.select').getAttribute('addresid')
          this.checkoutlist.forEach(function (val, index) {
            if (that.dui[index]) {
              arr.push(val)
              arr1.push(val.id)
            }
          })
          console.log(arr)
          let user = this.getUser.name
          this.$http.get(`http://47.94.107.160:8888/orders?phonecode=${user}&arr=${JSON.stringify(arr)}&type=0&address=${address}`).then((res) => {
            if (res.data.protocol41 == undefined) {
              // 购车删除
              arr1.forEach(function (val, key) {
                that.deccarts(val)
              })
            }
          }).catch((res) => {
            console.log(res)
          })
        } else {
          this.pop('请勾选您想要结算的商品')
        }
      }
    },
    watch: {
     /* dist1 : function () {
        var that = this;
        var allp = 0;
        this.checkoutlist.forEach(function (val,index) {
          allp += that.distp(index);
        });
        console.log(allp);
        return allp;
      } */
    },
    computed: {
      ...mapGetters(['getUser', 'getLoding'])
    },
    mounted () {
      var user = this.$router.history.current.query.user
      var singleArr = []
      // var carlist = this.getUser.commodity;//刷新，等候状态管理太慢了.直接从router获取用户
      var carlist = JSON.parse(window.localStorage.getItem(user))// 读取本地存储
      console.log(carlist)
      carlist.forEach(function (val, index) {
        singleArr.push(parseInt(val.single))
      })
      var singleStr = JSON.stringify(singleArr)
      console.log(singleStr)
      /* 'http://47.94.107.160:8888/checkout?single='+singleStr */
      // localhost
      // 获取购物车商品
      this.$http.get(`http://47.94.107.160:8888/checkout?phonecode=${user}&single=${singleStr}`).then((res) => {
        if (!res.data) {
          this.checkoutlist = []
          this.pop('您还未添加商品')
        } else if (res.data == 'login') {
          this.pop('请先登陆')
        } else {
          // 获取地址
          this.$http.get(`http://47.94.107.160:8888/address?phonecode=${user}&type=3`).then((res) => {
            this.address = res.data
          }).catch((res) => {
            console.log(res)
          })
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
            // 折扣价格
            /* var name = 'distP' + index
            that.name = function () {

            }; */
            // 数量添加
            for (let a = 0; a < carlist.length; a++) {
              if (parseInt(carlist[a].single) == val.id) {
                val.number = carlist[a].number
              }
            }
          })
          this.checkoutlist = res.data
          this.dui = new Array(this.checkoutlist.length)
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
</script>
<style>
  @import "../assets/css/checkout.css";
</style>
