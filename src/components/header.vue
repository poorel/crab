<template>
  <div id="crab_head" class="w">
    <p class="logo">
      <span class="iconfont icon-tianxie"></span>
      <router-link to="/home"><span>青蟹</span></router-link>
    </p>
    <p class="regiter_login" v-if="!getUser">
      <router-link to="/login"><b>亲，请登陆</b></router-link>
      <router-link to="/register"><b>前往注册</b></router-link>
    </p>
    <p class="regiter_login" v-if="getUser">
      <router-link :to="check"><i class="iconfont icon-people">{{getUser.name | star}}</i></router-link>
      <span v-on:click="logout">注销</span>
    </p>
    <ul>
      <router-link to="/home"><li>推荐套餐</li></router-link>
      <router-link :to="single"><li @mouseenter="start" @mouseleave="end" :class="{ 'animated': true, 'swing': swing}" >购物页</li></router-link>
      <li class="gray">产地美景</li>
      <li class="gray">螃蟹百科</li>
      <li class="gray">加入我们</li>
      <li class="gray">个人博客</li>
    </ul>
    <div class="buy_car">
      <router-link :to="checkuser">
      <span>购物车丨</span>
      <span class="iconfont icon-shuniu1"></span>
      <span class="col-red">{{getUser.commodity ? getUser.commodity.length : null}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'crab_head',
  data () {
    return {
      test: '测试数据',
      swing: false,
      animating: 0
    }
  },
  methods: {
    // ...mapActions(["addcarts","clear"]),
    logout () {
      var user = this.getUser.name
      this.$http.get('http://47.94.107.160:8888/login?logout=1&phonecode=' + user).then((res) => {
        if (res.data === '注销成功') {
          this.$router.go(0)
          this.$router.push({path: '/home'})
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    start () {
      if (!this.swing) {
        this.swing = true
      }
    },
    end () {
      function timeout (ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms)
        })
      }

      async function asyncPrint (obj, ms) {
        await timeout(ms)
        obj.animating = 0
        obj.swing = false // this报错啦
      }
      if (!this.animating) {
        this.animating = 1
        asyncPrint(this, 1200)
      }

      /* 只为体验一下async */
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getLoding']),
    single () {
      var user = this.$getAES('001')
      return '/single?singleid=' + user
    },
    checkuser () {
      if (this.getUser) {
        var user = this.$getAES(this.getUser.name)
        return '/checkout?user=' + user
      } else {
        return '/login'
      }
    },
    check () {
      if (this.getUser) {
        var user = this.$getAES(this.getUser.name)
        return '/personcenter?user=' + user
      } else {
        return '/login'
      }
    }
  },
  filters: {
    star: function (value) {
      if (!value) return ''
      let reg = /(\d{3}).*(\d{4})/g
      value = value.toString().replace(reg, '$1****$2')
      return value
    }
  },
  mounted () {
    var result = this.test
    this.$emit('test1', result)
  }
}
</script>
<style>
  @import "../assets/css/header.css";
</style>
