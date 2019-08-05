import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Users from './components/users/Users.vue'
import Roles from './components/roles/Roles.vue'
import Rights from './components/rights/Rights.vue'

import Categories from './components/categories/Categories.vue'
import Goods from './components/goods/Goods.vue'
import GoodsAdd from './components/goods/GoodsAdd.vue'

Vue.use(VueRouter)

// 匹配路由规则
const router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users/:page?', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }

  ]
})

// 登录拦截判断
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
