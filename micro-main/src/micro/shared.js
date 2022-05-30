// 自定义事件对象
let event = {
  // 触发事件
  dispatch (event, data) {
    let customEvent = new CustomEvent(event, {
      detail: data
    })
    window.dispatchEvent(customEvent)
  }
}

// 初始化共享组件存储空间以及变化监听
let sharedComponent = {}
export function initSharedComponent () {
  Object.defineProperty(window, 'sharedComponent', {
    get: function () {
      return sharedComponent
    },
    set: function (value) {
      sharedComponent = value
      event.dispatch('onSharedComponentChange', value)
    }
  })
}
