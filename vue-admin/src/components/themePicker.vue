<template>
  <el-dropdown class="dropdown-container" @command="handleCommand" trigger="click">
  <span class="el-dropdown-link">
    <img style="width:22px" src="../assets/theme.png" alt="">
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="custom-blue"><span class="color-span color-span-blue"></span>靛青</el-dropdown-item>
    <el-dropdown-item command="custom-dark"><span class="color-span color-span-dark"></span>宝蓝</el-dropdown-item>
    <el-dropdown-item command="custom-black"><span class="color-span color-span-black"></span>深蓝</el-dropdown-item>
    <!-- <el-dropdown-item command="custom-black2"><span class="color-span color-span-black2"></span></el-dropdown-item>
    <el-dropdown-item command="custom-default"><span class="color-span color-span-default"></span></el-dropdown-item> -->
    <el-dropdown-item command="custom-red"><span class="color-span color-span-red"></span>洋红</el-dropdown-item>
    <el-dropdown-item command="custom-orange"><span class="color-span color-span-orange"></span>橙红</el-dropdown-item>
    <el-dropdown-item command="custom-purple"><span class="color-span color-span-purple"></span>青莲</el-dropdown-item>
    <el-dropdown-item command="custom-green"><span class="color-span color-span-green"></span>碧蓝</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>
<script>
  export default{
    methods: {
      handleCommand(command) {
        localStorage.setItem('currentTheme', command)
        this.$store.dispatch('changeTheme', command)
        this.$emit('currentTheme', command)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dropdown-container{
    position: fixed;
    z-index: 1005;
    top:30px;
    right:205px;
    color:#fff;
    cursor: pointer;
  }
  .color-span{
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: -3px;
    margin-right: 13px;
  }
  .color-span-black{
    background: #081029;   
  }
  .color-span-default{
    background:#438eb9;
  }
  .color-span-dark{
    background:#334681;
  }
  .color-span-blue{
    background:#217bb8;
  }
  .color-span-orange{
    background:#dc3945;
  }
  .color-span-red{
    background:#b82148;
  }
  .color-span-purple{
    background:#673ab7;
  }
  .color-span-green{
    background:#00beac;
  }
  .color-span-black2{
    background:#212121;
  }
</style>
