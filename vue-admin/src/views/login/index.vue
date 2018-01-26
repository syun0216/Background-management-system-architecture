<template>
  <div class="login-container">
    <!-- <div class="bgstar">
        <object type="application/x-shockwave-flash" data="../../../static/login/f.swf" width="250" height="250">
            <param name="quality" value="high">
            <param name="wmode" value="transparent">
            <param name="allowScriptAccess" value="sameDomain">
            <param name="allowFullScreen" value="true">
        </object>
    </div> -->
    <el-form autoComplete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="off" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima"></icon-svg>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="请输入密码"></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;height:50px" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <!-- <div class='tips'>
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin@1128</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { getToken ,setToken, removeToken } from '@/utils/auth'
import {useragent} from '@/utils/userAgent'
import md5 from 'js-md5'
import { user_login, user_logout } from '@/api/user'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur',message:'请输入用户名' }],
        password: [{ required: true, trigger: 'blur',message:'请输入密码' }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
        console.log('click login')
        this.loginForm.password = md5(this.loginForm.password)
      this.loading = true
      if(useragent().trident){
        this.$confirm('IE浏览器可能会导致本系统的部分功能无法使用', '注意', {
          confirmButtonText: '下载谷歌浏览器',
          cancelButtonText: '继续登录',
          type: 'warning'
        }).then((action) => {
          if(action === 'confirm'){
            window.location.href = 'http://sw.bos.baidu.com/sw-search-sp/software/9e6bc213b9d0b/ChromeStandalone_63.0.3239.132_Setup.exe'
          }
        }).catch(() => {
          user_login(this.loginForm.username, this.loginForm.password).then(response => {
          this.loading = false
                  const data = response.data
                  console.log(data)
                  setToken(data[0])
                  this.$store.commit('SET_TOKEN', data[0])
                  this.$router.push({ path: '/myfocus' })
                  resolve()
                }).catch(error => {
                  this.loading = false
                  reject(error)
                })        
        });
        
      }else{
        this.$store.dispatch('NewLogin', this.loginForm).then(() => {
        this.loading = false
        // const roles = [getToken()]
        // this.$store.dispatch('GenerateRoutes', { roles }).then(() => {
        //   console.log(this.$store.getters.addRouters)
        //   this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
        //       // next({ ...to })
        // })
        this.$router.push({ path: '/myfocus' })
      }).catch(() => {
        this.loading = false
      })
      // } else {
      //   console.log('error submit!!')
      //   return false
      // }
      // })
      }
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    background-image: url('../../assets/login_bg.jpg');
    background-repeat:no-repeat;
    // background-size: 100% 100%;
    background-position: center;
    overflow:hidden;
    width:100%;
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #959595; opacity:1; 
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #959595;opacity:1;
    }

    input:-ms-input-placeholder{
        color: #959595;opacity:1;
    }

    input::-webkit-input-placeholder{
        color: #959595;opacity:1;
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #2f2f2f;
      height: 47px;
      opacity: 1;
      font-size: 20px;
    vertical-align: -3px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #787c7f;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
          position: absolute;
    /* left: 0; */
    right: 8rem;
    width: 400px;
    padding: 35px 35px 15px 35px;
    /* margin: 120px auto; */
    background: rgba(255, 255, 255, 0.7);
    top: 16rem;
    border-radius:10px;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
  .bgstar {
      position: absolute;
      width: 194px;
      height: 194px;
      top: 347px;
      left: 378px;
      /*background: url("images/login/bgstar.png?v=v004") no-repeat;*/
  }
</style>
