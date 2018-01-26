<template>
  <div id="app_header">
    <theme-picker @currentTheme="handleCurrentTheme"></theme-picker>
    <div class="title_img"><img src="../../assets/logoNew.png" alt="logo"/></div>
    <ScreenFull/>  
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="../../assets/userdemo.jpg">
        <span class="user-name" v-if="username != null">{{username}}</span>
        <!-- <i class="el-icon-arrow-down"></i> -->
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            我的关注
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div> 
</template>
<script>
import ScreenFull from '@/components/ScreenFull'
import themePicker from '../../components/themePicker.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      username: null
    }
  },
  components: {
    ScreenFull,
    themePicker
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleCurrentTheme(theme) {
      this.currentTheme = theme
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted() {
    this.username = this.token
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 #app_header{
    width:100%;
    height:80px;
    position:fixed;
    top:0;
    left:0;
        z-index: 999;
    .title_img{
      display: inline-block;
      margin: 14px 42px;
    }
     .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 24px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 17px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    top:13px;
                }
                .user-name{
                  vertical-align: 12px;
                  margin: 10px;
                }
                .el-icon-arrow-down {
                    position: absolute;
                    right: -20px;
                    top: 13px;
                    font-size: 18px;
                }
            }
        }
  }
</style>