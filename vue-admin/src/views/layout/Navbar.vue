<template>
  <div class='nav-container'>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <levelbar></levelbar>
      <!-- <tabs-view></tabs-view> -->
      <!-- <el-button style="float:right;margin-top:8px" type="info" @click="goback">返回上一个页面</el-button> -->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import Hamburger from '@/components/Hamburger'
import TabsView from './TabsView'

export default {
  components: {
    Levelbar,
    Hamburger,
    TabsView
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .nav-container{
    background:#f0f3f6;
     position: fixed;
     top: 80px;
     z-index: 50;
     width:100%;
     padding:10px 0 0;
    .navbar {
        height: 52px;
        line-height: 50px;
        border-radius: 0px !important;
        padding: 0 8px;
        background: #fff;
        box-shadow: 7px 2px 10px #ccc;
        // box-shadow: 0px 0px 10px #ccc;
        // -webkit-box-shadow: 0px 0px 10px #CCC;
        // box-shadow: 0px 0px 10px #CCC;
        /* margin-top: 93px; */
        border-radius: 0px !important;
        width: 100%;
        .hamburger-container {
            line-height: 58px;
            height: 56px;
            float: left;
            padding: 0 10px;
            outline:none;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
    }
  }
</style>

