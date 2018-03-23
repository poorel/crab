<template>
  <div id="body_content">
    <loading v-show="getLoding"></loading>
    <header1 v-show='header_show != false'></header1>
    <!--内容一致，<keep-alive>就无需加载-->
    <router-view @header_if="change1"></router-view>
    <footer1 :a="header_show"></footer1>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import header1 from './components/header.vue'
import footer1 from './components/footer.vue'
export default {
  name: 'body_content',
  data () {
    return {
      header_show: '爱你就像爱生命'
    }
  },
  methods: {
    ...mapActions(['adduser', 'full']),
    change1 (x) {
      this.header_show = x
    }
  },
  components: {
    header1,
    footer1
  },
  computed: {
    ...mapGetters(['getUser', 'getLoding'])
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
