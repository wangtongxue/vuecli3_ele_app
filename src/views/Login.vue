<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="my login image">
        </div>
        <!--手机号-->
        <InputGroup
            type="number"
            v-model="phone"
            placeholder="手机号"
            :btnTitle="btnTitle"
            :disabled="disabled"
            :error="errors.phone"
            @btnClick="getVerifyCode"
        ></InputGroup>
        <!--验证码-->
        <InputGroup
            type="number"
            v-model="verifyCode"
            placeholder="验证码"
            :error="errors.code"
        >
        </InputGroup>
        <!--用户服务协议-->
        <div class="login_des">
            <p>
                新用户自动登陆 ，表示已同意
                <span>用户服务协议</span>
            </p>
        </div>
        <!--登录按钮-->
        <div class="login_btn">
            <button :disabled="isLogin" @click="loginHandle">登陆</button>
        </div>
    </div>
</template>

<script>
  import InputGroup from '../components/InputGroup'
  export default {
    name: "Login",
    components: {
      InputGroup
    },
    data(){
      return {
        phone: '', // 手机号
        verifyCode: '', // 验证码
        errors: {}, // 错误提示
        btnTitle: '获取验证码',
        disabled: false // 一开始不禁用
      }
    },
    computed: {
      isLogin(){
        if(!this.phone || !this.verifyCode){
          return true
        }else {
          return false
        }
      }
    },
    methods: {
      loginHandle(){ // 点击登陆
        // 取消错误提醒
        this.errors = {}
        // 发送请求
        this.$http.post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.verifyCode
        })
          .then(res => {
            console.log(res)
            // 检验成功
            localStorage.setItem('mobile_login', true)
            this.$router.push('/')
          })
          .catch((err) => {
            this.errors = {
              code: err.response.data.msg
            }
          })
      },
      getVerifyCode(){ // 点击获取验证码
        if(this.validatePhone()){ // 判断当前手机号是否存在 是否正确 如果正确 继续执行
          this.validateBtn() // 获取验证码按钮的显示提示
          // 发送验证码
          this.$http.post("/api/posts/sms_send", {
            tpl_id: '137860',
            key: 'f8c68cff5a3a34c55618d18ed4f793e7',
            phone: this.phone
          })
            .then(res => {
              // alert("验证码发送成功")
            })
        }
      },
      validateBtn(){ // 改变获取验证码按钮的样式
        let time = 60
        let timer = setInterval(() => {
          if(time == 0){ // 倒计时结束
            clearInterval(timer) // 清除定时器
            this.btnTitle = '获取验证码'
            this.disabled = false
          }else {
            // 开始倒计时
            time --
            this.btnTitle = time + 's后重新获取'
            this.disabled = true
          }
        }, 1000)
      },
      validatePhone(){ // 点击发送验证码的时候 验证手机号是不是正确
        if(!this.phone){
          this.errors = { phone: "手机号不能为空" }
          return false
        }else if( !/^1[345678]\d{9}$/.test(this.phone) ){
          this.errors = { phone: "请输入正确格式的手机号" }
          return false
        }else {
          this.errors = {}
          return true
        }
      }
    }
  }
</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
}
.logo {
    text-align: center;
}
.logo img {
    width: 150px;
}
.text_group,
.login_des,
.login_btn {
    margin-top: 20px;
}
.login_des {
    color: #aaa;
    line-height: 22px;
}
.login_des span {
    color: #4d90fe;
}
.login_btn button {
    width: 100%;
    height: 40px;
    background-color: #48ca38;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    border: none;
    outline: none;
}
.login_btn button[disabled] {
    background-color: #8bda81;
}
</style>