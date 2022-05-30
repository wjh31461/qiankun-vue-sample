import Vue from 'vue'
import Router from 'vue-router'
import defaultRoutes from './routes'
import { store } from '@/store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

Vue.use(Router)

function createRouter () {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: defaultRoutes
  })
}

const router = createRouter()

router.beforeEach((to, from, next) => {
  // NProgress.start()
  let loggedIn = Vue.ss.get('loggedIn')
  if (loggedIn || !window.custom.loginPage) {
    handleBeforeEach(to, from, next)
  } else {
    if (to.name === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
    Vue.ss.set('loggedIn', false)
  }
})

function handleBeforeEach (to, from, next) {
  let getters = store.getters['user/GET_ROUTES']
  // 判断当前是否已经处理过路由信息
  if (getters && Object.keys(getters).length > 0) {
    next()
    return
  }
  // 处理路由信息后进行跳转
  store.dispatch('user/Navigation').then((activeRule) => {
    next({
      name: 'prefetch',
      params: {
        activeRule: activeRule
      }
    })
  })
}

// router.afterEach(() => {
//   NProgress.done()
// })

export default router
