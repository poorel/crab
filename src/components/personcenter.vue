<template>
  <div id="personcenter" class="w">
    <div class="orders">
      <h2>订单列表</h2>
      <div class="order_list">
        <p>
          <span>&nbsp;商品名</span><!--图片加标题-->
          <span>&nbsp;单价</span>
          <span>&nbsp;数量</span>
          <span>&nbsp;订单号</span>
          <span>&nbsp;订单时间</span><!--有效期-->
          <span>&nbsp;操作</span><!--支付/删除或查看详情-->
        </p>
        <ul>
          <li v-for="(val,index) in orderlist">
            <div>
              <img :src=val.pic />
              <span>{{val.title}}</span>
            </div>
            <span class="price">￥{{val.unit}}</span>
            <span class="number">{{val.number}}</span>
            <span class="ordernumber">{{val.tracking}}</span>
            <span class="ordertime">{{val.time}}</span>
            <p class="orderstate1" v-if="val.pay == 0 &&val.tf ==1"><span>前往支付</span><span>删除订单</span></p>
            <p class="orderstate2" v-if="val.pay == 1 &&val.tf ==1">查看详情</p>
            <p class="orderstate2" v-if="val.tf ==0">订单已过期</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="address">
      <h2>收货地址</h2>
      <div class="address_content">
        <div class="add_address">
          <h3>新增地址</h3>
          <v-distpicker :placeholders="placeholders" @area="aa" @city="bb" @province="cc" hide-area></v-distpicker>
          <span>详细地址：</span><input type="text" placeholder="请输入详细住址" id="detail_addre1" v-model="detailaddress"/><br/>
          <span>姓名：</span><input type="text" placeholder="请输入收件人姓名" id="detail_addre2" v-model="name"/><br/>
          <span>电话号码：</span><input type="text" placeholder="请输入收件人号码" id="detail_addre3" v-model="receiver"/>
          <div>
            <button type="button" v-on:click="addaddress">提交</button>
          </div>
        </div>
        <div class="address_list">
          <h3>地址列表(最多保存５条收货地址(需要后台设置一下，不太高兴做))</h3>
          <p>
            <span>&nbsp;收货人</span>
            <span>&nbsp;收货地址</span>
            <span>&nbsp;联系电话</span>
            <span>&nbsp;操作</span>
          </p>
          <ul>
            <li v-for="(val,index) in address">
              <input type="text" readonly :value=val.name>
              <input type="text" readonly :value=val.addres>
              <input type="text" readonly :value=val.receiver>
             <!-- <span>修改</span>-->
              <span v-on:click="decaddress(val.id)">删除</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <transition enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutDown">
      <popup v-show="view" :popup_content="view_content"></popup>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VDistpicker from 'v-distpicker'
  import {startMove} from '../assets/js/move'
  export default {
    name: 'personcenter',
    data () {
      return {
        placeholders: {
          province: '------- 省 --------',
          city: '--- 市 ---',
          area: '--- 区 ---'
        },
        detailaddress: '',
        name: '',
        receiver: '',
        orderlist: [],
        address: [],
        view: false, // pop
        view_content: '' // pop
      }
    },
    computed: {
      ...mapGetters(['getUser', 'getLoding'])
    },
    methods: {
      cc (data) {
        this.placeholders.province = data.value
      },
      bb (data) {
        this.placeholders.city = data.value
      },
      aa (data) {
        this.placeholders.area = data.value
      },
      pop (x) {
        this.view_content = x
        this.view = true
        setTimeout(() => {
          this.view = false
        }, 1500)
      },
      little_up (el) {
        var ele = el.currentTarget
        ele.setAttribute('style', 'box-shadow:0px 0px 10px 0px #ff6633;')
        startMove(ele, {'margin-top': -5})
      },
      little_down (el) {
        var ele = el.currentTarget
        ele.setAttribute('style', 'box-shadow:none;')
        startMove(ele, {'margin-top': 0})
      },
      addaddress () {
        if (!this.placeholders.province) {
          this.pop('请选择您所在的省份')
          return false
        }
        if (!this.placeholders.city) {
          this.pop('请选择您所在的城市')
          return false
        }
        /* if(!this.placeholders.area){
          this.pop('请选择您所在的街区');
          return false;
        } */
        if (!this.detailaddress) {
          this.pop('请填写您的详细地址')
          return false
        }
        if (!this.name) {
          this.pop('请填写收件人姓名')
          return false
        }
        if (!this.receiver) {
          this.pop('请填写收件人手机号码')
          return false
        } else {
          if (!(/^1[34578]\d{9}$/.test(this.receiver))) {
            this.pop('手机号码填写不规范')
            return false
          }
        }
        // 添加地址
        // let user = this.$router.history.current.query.user;
        let user = this.getUser.name
        this.$http.get(`http://47.94.107.160:8888/address?phonecode=${user}&type=0&receiver=${this.receiver}&name=${this.name}&addre=${this.placeholders.province + this.placeholders.city/* +this.placeholders.area */+ ' ' + this.detailaddress}`).then((res) => {
          res.data.protocol41 ? this.pop('添加成功') : this.pop('添加错误，请重试')
          window.location.reload // 待改善
          // 添加进入当前数组或者直接刷新
        }).catch((res) => {
          console.log(res)
        })
      },
      decaddress (x) {
        let user = this.getUser.name
        this.$http.get(`http://47.94.107.160:8888/address?phonecode=${user}&type=1&id=${x}`).then((res) => {
          if (res.data.protocol41) {
            this.pop('删除成功')
            this.address.forEach(function (val, index) {
              if (val.id == x) {
                this.splice(index, 1)
              }
            }.bind(this.address))
          } else {
            this.pop('服务器错误，请重试')
          }
        }).catch((res) => {
          console.log(res)
        })
      }
    },
    components: {
      VDistpicker
    },
    mounted () {
      let user = this.$router.history.current.query.user
      this.$http.get(`http://47.94.107.160:8888/orders?phonecode=${user}&type=3`).then((res) => {
        this.orderlist = res.data
      }).catch((res) => {
        console.log(res)
      })
      // 获取地址
      this.$http.get(`http://47.94.107.160:8888/address?phonecode=${user}&type=3`).then((res) => {
        this.address = res.data
      }).catch((res) => {
        console.log(res)
      })
    }
  }
</script>

<style>
  @import "../assets/css/personcenter.css";
</style>
