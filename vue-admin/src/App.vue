<template>
  <div id="app" :class="currentTheme">

    <router-view></router-view>
    <el-tooltip placement="top" content="点击返回顶部">
      <v-backtotop transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></v-backtotop>
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      myBackToTopStyle: {
        right: '20px',
        bottom: '128px',
        width: '40px',
        height: '40px',
        'border-radius': '23px',
        'line-height': '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1', // 按钮的背景颜色
        'z-index': 100
      }
    }
  },
  created() {
    window.onload = function() { // 禁止缩放
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      var lastTouchEnd = 0
      document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      }, false)
    }
    // this.currentTheme = localStorage.getItem('currentTheme') != null ? localStorage.getItem('currentTheme') : 'custom-black'
    // console.log(this.$route.name)
  },
  computed: {
    ...mapGetters([
      'currentTheme'
    ])

  },
  watch: {
    currentTheme() {

    }
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
  .el-tooltip__popper{
    width: 200px;
  }
</style>
