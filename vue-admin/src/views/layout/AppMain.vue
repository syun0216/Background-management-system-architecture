<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepalive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepalive" :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main{
    box-shadow: 0 0 10px #ccc;
    margin: -8px 18px 16px;
    border-radius: 10px;
    padding: 10px;
    background: #fff;
    position: relative;
    // min-height:850px;
  }
</style>
