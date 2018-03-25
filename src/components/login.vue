<template>
  <div id="login_content">
    <div class="bg">
      <div class="login">
        <div class="login-select">
          <span class="login1">
            登陆
          </span>
          <span class="login2">
          手机动态登录
          </span>
        </div>
        <form action="#" method="get" id="login">
          <div class="mobile">
            <span class="iconfont icon-shouji"></span>
            <input type="text" placeholder="请输入手机号" v-model="phonecode">
          </div>
          <div class="password1">
            <span class="iconfont icon-mima"></span>
            <input type="password" placeholder="请输入密码" v-model="pwd">
          </div>
          <div class="password2">
            <div>
              <span class="iconfont icon-mima"></span>
              <input type="text" placeholder="请输入密码">
            </div>
            <button type="button">获取验证码</button>
          </div>
          <a href="#" target="_blank" class="forget">忘记密码?</a>
          <button type="button" class="denglu" v-on:click="login">登录</button>
          <button type="button" class="register">还不是会员? <router-link to="/register"><a href="#">立即注册</a></router-link></button>
        </form>

      </div>
    </div>
    <popup ref="pop"></popup>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
var login = {
  name: 'login_content',
  data () {
    return {
      header_show: true, // 控制头部参数
      phonecode: '',
      pwd: ''
    }
  },
  methods: {
    ...mapActions(['adduser', 'full']),
    login () {
      // this.$refs.child.$emit('childMethod') // 方法1
      // 方法2
      let phoneCode = this.phonecode
      if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phoneCode))) {
        this.$refs.pop.selfPOP('请输入正确的手机号码')
        return false
      };
      let pwd = this.pwd
      if (!this.pwdtest) {
        this.$refs.pop.selfPOP('请输入6-20位常规密码')
        return false
      }
      this.$http({
        method: 'get',
        url: `http://47.94.107.160:8888/login?phonecode=${phoneCode}&pwd=${pwd}`
      }).then((res) => {
        if (res.data.statu) {
          this.adduser(phoneCode)
          let storage = window.localStorage.getItem(phoneCode)
          if (storage) {
            if (storage.length) {
              this.full(JSON.parse(storage))
            }
          } else {
            window.localStorage.setItem(phoneCode, [])
          }

          this.$router.push({path: '/home'})
        } else {
          this.$refs.pop.selfPOP('账号或密码错误')
        }
      }).catch((res) => {
        this.$refs.pop.selfPOP('请求失败，请再次尝试')
      })
    }
  },
  components: {

  },
  computed: {
    ...mapGetters(['getUser']),
    pwdtest: function () {
      let pwd = this.pwd
      var $test1 = /^([a-zA-Z]{6,20})|([0-9]{6,20})|([@#$%^&*]{6,20})$///  弱：纯数字，纯字母，纯特殊字符
      var $test21 = /(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[@#$%^&*]+$)^([0-9a-zA-Z]{6,20})$/
      var $test22 = /(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[@#$%^&*]+$)^([@#$%^&*a-zA-Z]{6,20})$/
      var $test23 = /(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[@#$%^&*]+$)^([0-9@#$%^&*]{6,20})$/// 中：字母+数字，字母+特殊字符，数字+特殊字符
      var $test3 = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,20}$/ // 强：字母+数字+特殊字符
      var mima = 0
      if ($test3.test(pwd)) {
        mima = 3// 强密码
      } else if ($test21.test(pwd) | $test22.test(pwd) | $test23.test(pwd)) {
        mima = 2// 中密码
      } else if ($test1.test(pwd)) {
        mima = 1// 弱密码
      } else {
        mima = 0// 密码格式错误
      }
      return mima
    }
  },
  beforeMount () {
    // 触发头部显影
    var result = this.header_show
    this.$emit('header_if', result)
    // enter事件
    document.onkeyup = (e) => {
      if (window.event) { e = window.event }// 如果window.event对象存在，就以此事件对象为准
      var code = e.charCode || e.keyCode
      if (code == 13) {
        this.login()
      }
    }
  }
}

export default login
</script>
<style>
  @import "../assets/css/login.css";
</style>
