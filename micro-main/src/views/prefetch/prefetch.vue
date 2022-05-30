<template>
  <!-- 外层遮罩蒙层 -->
  <div class="prefetch-mask">
    <div class="spin-container">
      <!-- loading -->
      <a-spin :spinning="spinning">
        <a-icon class="spin-icon" slot="indicator" type="loading" spin />
      </a-spin>
      <!-- 加载百分比 -->
      <div class="spin-percent">
        {{percent}} %
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { loadMicroApp } from 'qiankun'
import apps from '@/micro/apps'

export default {
  name: 'prefetch',
  data () {
    return {
      activeRule: this.$route.params.activeRule,
      spinning: true,
      percent: 0
    }
  },
  created () {
    this.handleRegisterAll()
  },
  methods: {
    handleRegisterAll () {
      let self = this

      let loadedApps = {}
      let count = 0
      let stepCount = 4

      Promise.all(apps.map(microApp => {
        return new Promise(async (resolve, reject) => {
          handlePercent()
          let app = loadMicroApp(microApp)
          loadedApps[microApp.name] = {
            app,
            routes: []
          }
          await app.loadPromise
          handlePercent()
          await app.bootstrapPromise
          handlePercent()
          // 不触发mount生命周期，直接进行卸载
          await app.unmount()
          count++
          handlePercent('unmounted', microApp.name)
          resolve()
        })
      })).then(() => {
        // 传递loadedApps，防止重复加载
        self.$bus.$emit('onUpdateLoadedApps', loadedApps)
        self.spinning = false
        // 判断是否存在路由地址缓存，否则重定向至根目录
        let routePath = Vue.ss.get('routePath')
        self.$router.push(routePath || self.activeRule)
      })
      // 计算进度
      function handlePercent (step, name) {
        self.percent += parseInt((1 / apps.length / stepCount) * 100)
        // 加载最后一个微应用
        if (count === apps.length && step === 'unmounted') {
          self.percent = 100
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .prefetch-mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    .spin-container{
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .spin-icon{
        font-size: 120px;
      }
      .spin-percent{
        color: #fff;
        font-size: 30px;
        position: absolute;
      }
    }
  }
</style>
