<template>
  <div id="body_content">
    <loading v-show="getLoding"></loading>
    <header-one v-show='header_show != false'></header-one>
    <!--内容一致，<keep-alive>就无需加载-->
    <router-view @header_if="change1" :key="key"></router-view>
    <footer-bottom>
      <p slot="test" slot-scope="{ address }">
        <span class="iconfont icon-dizhi"></span>
        <span>{{ address }}</span>
      </p>
    </footer-bottom>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import headerOne from './components/header.vue'
import footerBottom from './components/footer.vue'
export default {
  name: 'body_content',
  data () {
    return {
      header_show: true
    }
  },
  methods: {
    ...mapActions(['adduser', 'full']),
    change1 (boolean) {
      this.header_show = boolean
    }
  },
  components: {
    headerOne,
    footerBottom
  },
  computed: {
    ...mapGetters(['getUser', 'getLoding']),
    key () {
      return this.$route.path == '/single' ? this.$route.path + new Date() : 'NoRefresh'
    }
  },
  // beforeMount
  mounted () {
    // 获取是否登陆并保持登陆
    if (!this.getUser) {
      this.$http({
        method: 'get',
        url: `http://47.94.107.160:8888/test` // 127.0.0.1
      }).then((res) => {
        if (res.data != '请先登陆') {
          this.adduser(res.data)// 添加用户
          if (this.getUser) {
            this.full(JSON.parse(window.localStorage.getItem(res.data)))// 读取本地数据并填充至状态仓库
          }
        } else {
          let fullPath = this.$router.history.current.fullPath
          if (fullPath.indexOf('/checkout') != -1 || fullPath.indexOf('/personcenter') != -1) {
            this.$router.push({path: '/home'})
          }
        }
      }).catch((res) => {
        console.log('恢复客户信息失败')
      })
      // 获取登陆信息，暂时不进行数据库存储。
    }
  },
  beforeDestroy () {
    // alert(1);
  }
}
</script>
 <style>
   @import "assets/css/header.css";
 </style>
