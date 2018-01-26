## 前言
最近做了一套后台管理系统，参考的是饿了么大神[花裤衩](https://github.com/PanJiaChen)的[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin),自己跟着撸一遍之后突然想比对一下react和vue在后台管理系统的方案以及架构，于是有了此项目。

## 参考
- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
- [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)

## 简介
本项目集合vue+vuex+vue-router+element-ui、react+react-router-dom+redux+antd-design(分别用比较火的两个脚手架create-react-app和蚂蚁金服的react轻量级框架dva)
着重想介绍后台管理系统中的**权限管理**，**网络请求**、**状态机**、**缓存**、**组件的写法**、**打包上线**、**优化**以及在构建一个后台系统中可能会遇到的杂七杂八的问题，希望读者能够少走弯路。<br />
(本文档将持续更新...)

## 注意
<p align="center;" style="color:#ff5858;font-size:18px">
 本项目的代码只是作为参考，真正想搭自定义的框架请使用脚手架一步步来，这样才会学得更多
</p>

## vue部分
### 项目搭建和必装的插件
不得不说vue的构建工具真tm舒服，简直可以简化很多工作了。使用[vue-cli](https://github.com/vuejs/vue-cli)的命令
`vue init webpack my-project`生成我们第一个vue项目（点击**vue-cli**查看安装教程）,这里我们还需要[element-ui](http://element-cn.eleme.io/#/zh-CN/component/installation)、[vuex](https://vuex.vuejs.org/zh-cn/intro.html)和[axios](https://www.jianshu.com/p/df464b26ae58),分别使用一下命令：<br>
`npm i element-ui -S`<br>
`npm i vuex -S`<br>
`npm i axios -S`<br>
至此我们完成项目的第一步

### 本地服务器的搭建
本地开发的我开的是php的服务，用nginx搭的服务器，nginx的详细配置请点击[此处](http://blog.csdn.net/hzsunshine/article/details/63687054)
当然你也可以使用云端的服务器地址，**不过我的建议是开发的时候自己在本地搭一套服务也是极好的，这样可以方便我们修改接口，而不用等到线上更新**。我们还可以使用**mock**，<span style="color:#ff5858;font-size:18px;font-weight:bold">
前提是我们在与后端一起定义好接口文档，实现前后分离快速开发</span>,
mock的教程点击[此处](https://www.cnblogs.com/zhenfei-jiang/p/7235339.html)<br>
这些工作都做完之后我们可能会遇到跨域的问题：<span style="color:#ff5858;font-size:18px;font-weight:bold">此时不要慌，打开根目录下的config文件夹，打开index,js，在dev选项里添加proxyTable</span>,代码参考：<br>
```
port: 9528,
proxyTable: {
  '/api': {
    target: 'http://localhost:1091',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }
},
```
此处的意思是将本地服务器9528的/api请求转发到1091的/api处,1091为我们本地nginx的服务

### 封装网络请求
1、在我们根目录的config文件下创建一个global_parmas.js文件(*用于储存全局参数*)，因为我的项目是后台和前端都在一个文件夹里所以代码如下：
```
var global_params = {
  dev_url: 'http://localhost:9528',
  pro_url: 'http://' + window.location.host
}

module.exports = global_params
```
<p align="center;" style="color:#ff5858;">
 注意：为了避免打包的时候es6的编译出错，而导致ie11及以下浏览器(*包括QQ浏览器在内*)的直接空白页，此处bug出现在vue的项目按需引入iview-ui，我们使用var global_params而不是const global_params
</p>

在我们的src项目下新建一个utils文件夹放我们的公共方法，新建一个文件叫fetch.js或者叫request.js之类的，*(该文件用于封装我们的网络请求方法)*
详见(vue-admin/src/utils/fetch.js),<br>首先我们引入相关的依赖，代码如下:
```
import axios from 'axios'; //引入网络请求插件axios
import { Message, MessageBox } from 'element-ui';//引入element-ui的提示框
import { getToken } from '@/utils/auth';//引入验证组件，主要是确定用户权限，这个之后会说
import global_params from '../../config/global_params' 引入我们配置的全局变量
```
之后我们封装我们的请求方法，核心代码:
```
// 创建axios实例
const service = axios.create({
    baseURL: process.env.NODE_ENV == "production" ? global_params.pro_url : global_params.dev_url,
    // 通过webpack的全局环境变量判断是在哪个环境下使用哪个url
    // timeout: 5000 // 请求超时时间
});
```
下一步，我们来创建request和response的拦截器，在request中，我们可以通过auth.js对登录的用户进行权限验证，并将token记录在请求头里，核心代码：
```
 if (store.getters.token) {
     config.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
 }
```
对于response的拦截,我们主要是对返回的状态码进行处理，然后统一打印出错误，并对错误进行统一的处理，具体按实际情况来，其核心代码如下：
```
service.interceptors.response.use(
    response => response,
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject(error);
    //     } else {
    //       return response.data;
    //     }
    error => {
        Message({ // 打印出错误
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error);
    }
)
```
详细请查阅(vue-admin/src/utils/fetch.js)<br>
3、发起一次网络请求<br>
在src文件夹目录下新建一个api文件夹(或者是http之类的名字)<br>
<image src="./img/img_swagger.png" /><br>
<image src="./img/img_api.png"/><br>
> 这里我的建议是api里的文件命名跟swagger里的接口名保持一致
> 我这里给出的例子是navigation（导航接口）

以下是navigation.js的代码：
```
// 以新增菜单接口为例
import fetch from '@/utils/new_fetch'
import qs from 'qs'
// 这里post请求的参数有两种写法，一种是URLSearchParams的写法，另一种是用qs.stringify()的写法


export function add_menu(form) { // 第一种
  const params = new URLSearchParams()
    params.append('name', form.name)
    params.append('path_temp', form.path_temp)
    params.append('parent_id', form.parent_id[form.parent_id.length - 1])
    params.append('img', form.img)
    params.append('sort', form.sort)
    params.append('level', form.parent_id.length + 1)
    params.append('shape', form.shape)
  return fetch({
    url: '/api/navigation/add_menu',
    method: 'post',
    data: params
  })
}

export function add_menu(form) { //第二种
  return fetch({
      url: '/api/navigation/add_menu',
      method: 'post',
      data: qs.stringify(form)
  })
}
```
而我们最好使用第二种，因为它简洁而且第一种会在ie上有bug <br>
下一步我们只需要在文件中引入 <br>
`import { add_menu } from '@/api/navigation'`

### 权限管理
*权限管理部分包括登录权限，菜单权限，请求权限等*
- 登录权限管理<br>
  顾名思义就是路由分登录之前和登录之后可见两部分，所以这里我们将路由大概归位三类<br>
  1、登录界面<br>
  2、404界面（也就是当用户输入不存在的路由url时，同意跳到404界面）<br>
  3、dashboard界面（也就是我们的桌面，）这个路由下包含着菜单的子路由<br>
  <span style="color:#ff5858">实现逻辑：</span>
  > 1、首先我们登录之前输入任何地址都将url重定向到login <br>
  > 2、登录时我们将登录返回的用户名或者id存到状态机store里还有cookie也保留一份，然后跳转到桌面 <br>
  > 3、登录后输入/login的登录url将被重定向到桌面的默认路由url <br>
  > 4、登录后输入任意不匹配的url将被重定向到404页面 <br>
  > 5、点击退出登录按钮，清除store和cookie里的用户信息，并跳转到登录界面

  路由代码核心如下：
  ```
  export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/myfocus/page',
    hidden: true,
    children: [{ path: 'dashboard', name: '仪表盘', component: _import('dashboard/index') }]
  } ...]
  export default new Router({
    // mode: 'history', //后端支持可开
    // mode: 'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRouterMap
  })
  ```
  Layout下的children就是我们的子路由,详细请参阅(*vue-admin/src/routes/index.js*)<br>
  除了路由,我们另外一个重点就是store了，我们引进方便存cookie的插件js-cookie以及md5密码,命令如下:
  `npm i js-cookie -S`
  `npm i js-md5 -S` <br>
  或者 `yarn add js-cookie`
  `yarn add js-md5`
  以登录为例，我简要谈一下store：
  > 我们首先在src目录下创建一个store文件夹,再创建一个getters.js（用于快速得到我们的state）,index.js（用于整合我们的module和getters）再创建一个module文件夹，在module文件夹里面创建要一个user.js
-
  具体核心代码：
  user.js

  ```
  state: {
    token: getToken(),
    name: null,
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, data) => {
      state.name = Object.assign(data)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // new login
    NewLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        user_login(username, userInfo.password).then(response => {
          const data = response.data
          console.log(data)
          setToken(data[0])
          commit('SET_TOKEN', data[0])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
  ```
  getters：
  ```
  const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    username: state => state.user.name,
    roles: state => state.user.roles,
  }
  export default getters
  ```
  index.js
  ```
  import Vue from 'vue'
  import Vuex from 'vuex'
  import user from './modules/user'
  import getters from './getters'

  Vue.use(Vuex)

  const store = new Vuex.Store({
    modules: {
      user
    },
    getters
  })

  export default store
  ```
  基础配置完成后，我们在登录界面对登录进行操作，具体代码位置（src/views/login/index.vue）
  核心代码:
  ```
  this.$store.dispatch('NewLogin', this.loginForm).then(() => {// 登录请求
  this.loading = false //加载界面
  this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
  this.$router.push({ path: '/dashboard' })// 跳转到首页
  }).catch(() => {
    this.loading = false
  })
  ```
  下一步 我们要对路由设置钩子函数,在用户输入url之前确定用户是否登录具体代码在（src/permission.js）
  ```
  const whiteList = ['/login'] // 不重定向白名单
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
      // console.log(getToken())
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        NProgress.done()
      }
   }
  })

  router.afterEach(() => {
    NProgress.done() // 结束Progress
  })
  ```
