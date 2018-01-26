<template>
  <el-menu unique-opened mode="vertical" :default-active="$route.path">
    <template v-if="menu != null" v-for="(item,index) in menu">   
    <el-submenu :index="'/'+item.path_temp" :key="index" v-if="item.children.length > 0">
        <template slot="title" style="color:#fff"><img class="sidebar_img" :src="item.img"/>{{item.name}}</template>
        <template v-for="(citem,cindex) in item.children">
        <!-- <el-menu-item-group > -->
        <router-link :to="'/'+citem.path_temp" :key="cindex">   
          <el-menu-item :index="'/'+citem.path_temp" >{{citem.name}}</el-menu-item>
        </router-link>  
        <!-- </el-menu-item-group> -->
        </template>
      </el-submenu>
      <router-link :to="'/'+item.path_temp+'/index'" :key="index" v-else>
        <el-menu-item  :index="'/'+item.path_temp+'/index'" >
          <template slot="title"><img class="sidebar_img" :src="item.img"/>{{item.name}}</template>
        </el-menu-item>  
      </router-link> 
    </template>  
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
import { fetch_menu } from '@/api/navigation'

export default {
  data() {
    return {
      menu: null
    }
  },
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  methods: {
    getMenu() {
      fetch_menu().then(data => {
        if (data.data.length > 0) {
          const _data = []
          data.data.forEach((val, idx) => {
            if (val.level === '1') {
              val.children = []
              val.img = `../../static/sidebar/${val.img}.png`
              _data.push(val)
            }
          })
          data.data.forEach((val, idx) => {
            _data.forEach((fval, fidx) => {
              if (fval.id == val.parent_id) {
                fval.children.push(val)
              }
            })
          })
          this.$store.dispatch('addSideBarData', { data: _data, raw_data: data.data })
          this.menu = _data
        } else {
          this.$message({
            message: '没有数据哦',
            type: 'warning'
          })
        }
      })
    }
  },
  created() {

  },
  mounted() {
    if (this.$store.state.app.sidebar.data == null) {
      this.getMenu()
    } else {
      this.menu = this.$store.state.app.sidebar.data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
.sidebar_img{
  vertical-align: -10px;
    margin-right: 22px;
    margin-left: 19px;
    width: 30px;
    height: 30px;
}
</style>
