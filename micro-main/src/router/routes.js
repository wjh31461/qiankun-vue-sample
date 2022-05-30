const defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login')
  },
  {
    path: '/prefetch',
    name: 'prefetch',
    component: () => import(/* webpackChunkName: "prefetch" */ '@/views/prefetch/prefetch')
  }
]

export default defaultRoutes
