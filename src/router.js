import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'index',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/home.vue')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/me.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('./views/order.vue')
        },
        {
          path: '/address',
          name: 'address',
          component: () => import('./views/address.vue')
        },
        {
          path: '/city',
          name: 'city',
          component: () => import('./views/City.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next ) => {
  // 定义是否登陆的常量
  const isLogin = localStorage.mobile_login ? true : false
  if(to.path === '/login'){
    next()
  }else {
    // 判断当前是否登陆
    isLogin ? next() : next('/login')
  }
})

export default router
