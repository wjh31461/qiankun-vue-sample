<template>
  <a-config-provider :locale="locales.zh_CN" :getPopupContainer="getPopupContainer">
    <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </a-config-provider>
</template>

<script>
import config from '@/../package.json'
import actions from '@/micro/actions'

const { locales } = window.antd

export default {
  name: 'App',
  data () {
    return {
      locales,
      // 是否完成路由渲染
      flag: false,
      appName: config.name
    }
  },
  computed: {
    listenRoutes () {
      return this.$store.state.user.routes
    }
  },
  watch: {
    listenRoutes: {
      deep: true,
      immediate: true,
      handler: function (routes) {
        if (Object.keys(routes).length) {
          // 添加动态路由信息
          this.$router.addRoute(routes)
        }
      }
    }
  },
  created () {
    let self = this

    actions.onGlobalStateChange(state => {
      if (!self.flag) {
        // 获取当前微应用应生成的路由
        let routes = state.routes[self.appName]
        // 整理动态路由
        self.$store.dispatch('user/GenerateRoutes', routes)
        self.flag = true
      }
      // 获取当前微应用应该进行缓存的tab页
      let app = state.loadedApps[self.appName]
      if (app) {
        let keepAlive = app.routes
        self.$store.commit('micro/SET_KEEPALIVE', keepAlive)
      }
    })
  },
  methods: {
    getPopupContainer (el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap()
      } else {
        return document.body
      }
    }
  }
}
</script>

<style>

</style>
