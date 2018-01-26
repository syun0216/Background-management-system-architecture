<template>
  <el-breadcrumb class="app-levelbar" separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
      <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect"><span class="level_bar_font">{{item.name}}</span></span>
      <router-link v-else :to="item.redirect||item.path"><span class="level_bar_font">{{item.name}}</span></router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      // if (first && (first.name !== '首页' || first.path !== '')) {
      //   matched = [{ name: '首页', path: '/' }].concat(matched)
      // }
      this.levelList = matched
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-levelbar.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  outline: none;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .level_bar_font{
    font-size:22px
  }
}
</style>
