<template>
  <div class="content-container">
    <!-- tab组件容器 -->
    <div class="tab-container">
      <TAB></TAB>
    </div>
    <!-- 子应用渲染容器 -->
    <div class="app-container">
      <a-spin v-show="loading" size="large" class="spin"></a-spin>
      <!-- 动态渲染微应用挂载容器，实现多实例同时运行，实现跨应用的keepAlive功能 -->
      <div v-for="app in apps" :key="app.name" :id="app.name"></div>
    </div>
  </div>
</template>

<script>
import TAB from '@comp/Tab/index.vue'
import apps from '@/micro/apps'

export default {
  components: { TAB },
  data () {
    return {
      apps,
      theme: window.custom.menuTheme,
      loading: false
    }
  },
  computed: {
    listenLoading () {
      return this.$store.state.micro.loading
    }
  },
  watch: {
    listenLoading: {
      deep: true,
      immediate: true,
      handler: function (loading) {
        this.loading = loading
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .content-container{
    height: 100%;
    .tab-container{
      height: 40px;
    }
    .app-container{
      position: relative;
      height: calc(~"100% - 40px");
      .spin{
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        ::v-deep.ant-spin-dot{
          font-size: 100px;
          .ant-spin-dot-item{
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
</style>
