import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/myfocus/page',
    hidden: true,
    children: [{ path: 'dashboard', name: '仪表盘', component: _import('dashboard/index') }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] }}]
  },
  // *********** 我的关注路由 start************
  {
    path: '/myfocus',
    component: Layout,
    redirect: '/myfocus/page',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'page', name: '关注的页面', component: _import('myfocus/page'), meta: { role: ['admin'], keepalive: false }},
      { path: 'manage', name: '关注管理', component: _import('myfocus/manage'), meta: { role: ['admin'], keepalive: false }}
    ]
  },
  // *********** 我的关注路由 end************
  // *********** 系统管理路由 start************
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'menu', name: '菜单管理', component: _import('system/Menu'), meta: { role: ['admin'], keepalive: false }},
      { path: 'basicsetting', name: '基础数据设置', component: _import('system/basicsetting'), meta: { role: ['admin'], keepalive: false }},
      { path: 'macrocontent', name: '宏观内容管理', component: _import('system/macrocontent'), meta: { role: ['admin'], keepalive: false }},
      { path: 'tags', name: '标签管理', component: _import('system/tags'), meta: { role: ['admin'], keepalive: false }},
      { path: 'collectionmanage', name: '收藏管理', component: _import('system/collectionmanage'), meta: { role: ['admin'], keepalive: false }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  // mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [

//     // *********** 系统管理路由 end************
//     {
//         path: '/permission',
//         component: Layout,
//         redirect: '/permission/index',
//         icon: 'tubiao',
//         noDropdown: true,
//         children: [{ path: 'index', name: '权限测试页面', component: _import('permission/index'), meta: { role: ['admin'] } }]
//     },
//     { path: '*', redirect: '/404', hidden: true }
// ]
