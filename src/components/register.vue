<template>
  <div id="registers">
    <div class="register">
      <h1>注册新用户</h1>
      <form action="http://47.94.107.160:8888/register" method="get" id="register">
        <div class="content1">
          <span class="iconfont icon-ren"></span>
          <span class="iconfont icon-asterisk"></span>
          <input type="text" placeholder="请输入手机号码" v-model="phoneCode" name="phonecode">
        </div>
        <div class="content2">
          <span class="iconfont icon-63"></span>
          <span class="iconfont icon-asterisk"></span>
          <input type="text" placeholder="请输入手机验证码" v-model="verification_code" name="code">
          <button type="button" v-on:click="verification()" id="verifycode">
            {{verifycode}}
          </button>
        </div>
        <div class="content3">
          <span class="iconfont icon-mima1"></span>
          <span class="iconfont icon-asterisk"></span>
          <input type="password" placeholder="请输入密码" v-model="pwd" name="pwd">
          <div class="level">
            <span v-bind:class="{color_ff6633:pwdtest==1}">弱</span>
            <span v-bind:class="{color_ff6633:pwdtest==2}">中</span>
            <span v-bind:class="{color_ff6633:pwdtest==3}">强</span>
          </div>
        </div>
        <div class="content4">
          <input type="checkbox" id="affirm" checked="checked" v-on:click="read">
          <span>我已阅读并同意</span>
          <a href="#">《青蟹会员服务条款》</a>
        </div>
        <button type="button" class="submit" v-on:click="allvifi()">注册</button>
      </form>
    </div>
    <popup ref="pop"></popup>
  </div>
</template>
<script>
export default {
  name: 'registerss',
  data () {
    return {
      header_show: false,
      phoneCode: '',
      verification_code: '',
      pwd: '',
      view: false,
      view_content: '',
      check: 1,
      verifycode: '获取验证码'
    }
  },
  methods: {
    read () { this.check ? this.check = 0 : this.check = 1 }, // 是否阅读
    verification () {
      let phoneCode = this.phoneCode
      if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phoneCode))) {
        this.$refs.pop.selfPOP('请输入正确的手机号码')
      } else {
        this.verifycode = 60
        var bt = document.getElementById('verifycode')
        bt.setAttribute('disabled', true)
        var timer = setInterval(function () {
          this.verifycode == parseInt(this.verifycode--)
          if (this.verifycode == 0) {
            this.verifycode = '获取验证码'
            clearInterval(timer)
            bt.setAttribute('disabled', false)
          }
        }.bind(this), 1000)
        let phoneCode = this.phoneCode
        this.$http.get('http://47.94.107.160:8888/note?phonecode=' + phoneCode).then((res) => {
          this.$refs.pop.selfPOP(res.data)
        }).catch((res) => {
          this.$refs.pop.selfPOP('服务器故障...')
        })
      }
    }, // 验证码判断
    allvifi () {
      let phoneCode = this.phoneCode
      if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phoneCode))) {
        this.$refs.pop.selfPOP('请输入正确的手机号码')
        return false
      };
      let verificationCode = this.verification_code
      if (!(/^\d{6}$/.test(verificationCode))) {
        this.$refs.pop.selfPOP('请输入6位数字验证码')
        return false
      }
      let pwd = this.pwd
      if (!pwd) {
        this.$refs.pop.selfPOP('请输入6-20位常规密码')
        return false
      }
      let check = this.check
      if (!check) {
        this.$refs.pop.selfPOP('请阅读会员守则并勾选')
        return false
      }
      // document.getElementById("register").submit();
      // 垃圾form提交
      this.$http.get('http://47.94.107.160:8888/register?phonecode=' + phoneCode + '&code=' + verificationCode + '&pwd=' + pwd).then((res) => {
        if (res.data == '注册成功') {
          this.$refs.pop.selfPOP(res.data)
          this.$router.push({path: '/login'})
        }
        this.$refs.pop.selfPOP(res.data)
      }).catch((res) => {
        this.$refs.pop.selfPOP('服务器故障...')
      })
    }
  },
  mounted () {

  },
  computed: {
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
  components: {

  }
}
</script>
<style>
  @import "../assets/css/register.css";
</style>
