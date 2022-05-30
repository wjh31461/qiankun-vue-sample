<template>
  <div class="action-container">
    <a-icon class="action-icon" type="poweroff" title="退出登录" v-if="loginPage"></a-icon>
    <hello-world v-if="HelloWorld"></hello-world>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      loginPage: window.custom.loginPage,
      HelloWorld: false
    }
  },
  created () {
    let self = this
    
    window.addEventListener('onSharedComponentChange', function (e) {
      let value = e.detail
      if (value['micro-sample'] && value['micro-sample'].HelloWorld) {
        Vue.component('HelloWorld', value['micro-sample'].HelloWorld)
        self.HelloWorld = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .action-container{
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 8px;
    .action-icon{
      font-size: 22px;
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 12px;
    }
    .action-icon:hover{
      background: rgba(0,0,0,.025);
    }
  }
</style>
