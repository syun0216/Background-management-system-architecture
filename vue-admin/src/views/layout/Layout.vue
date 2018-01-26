<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <TopHeader></TopHeader>
    <div class="divider_1" v-show="sidebar.opened"></div>
    <div class="sidebar-wrapper" >
      <sidebar class="sidebar-container"></sidebar>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <tabs-view></tabs-view>
      <app-main></app-main>
    </div>
  </div>
</template>


<script>
import { Navbar, Sidebar, AppMain, TopHeader, TabsView } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TopHeader,
    TabsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-204px, 0);
                .sidebar-container {
                    transform: translate(173px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container {
                margin-left: 40px;
            }
        }
        .divider_1{
                height: 1px;
                background: white;
                width: 207px;
                margin-left: 20px;
                position: fixed;
                top: 80px;
                left: 0px;
                z-index: 101;
                opacity: .6;
                transition:all .5s;
        }
        .sidebar-wrapper {
            width: 246px;
            position: fixed;
            top: 80px;
            bottom: 0;
            left: 0;
            z-index: 100;
            overflow: hidden;
            transition: all .28s ease-out;
            background: #34374a;
            ::-webkit-scrollbar{
              width: 0px;
            }
          -ms-overflow-style:none;
          /*火狐下隐藏滚动条*/
          /*-moz-overflow-style:none;*/

          /*overflow:-moz-scrollbars-none;*/
        }
        .sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            // padding-top:30px;
            top: 0;
            bottom: 0;
            left: 0;
            right: -1px;
            overflow-y: scroll;
        }
        .main-container {
            min-height: 100%;
            // overflow: auto;
            transition: all .28s ease-out;
            margin-left: 246px;
            min-width: 1086px;
        }
    }
</style>
