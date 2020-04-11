/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { check } from './check'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes
})

// 路由前置守卫，在载入前
router.beforeEach((to, from, next) => {

  // 所有页面的路由守卫，在页面载入前的校验，通过校验，才会进入当前页面的模版组件
  if (check()) {
    next()
  }

})

// 路由后置守卫，在载入后
router.afterEach((route) => {
  // console.log(route)
})


export default router
