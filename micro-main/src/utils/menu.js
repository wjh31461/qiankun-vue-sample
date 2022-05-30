// 递归整理菜单结构
export function handleMenus (children, target) {
  let menus = []
  function recursiveMenus (children, arr, key) {
    children.forEach((child, index) => {
      arr.push({
        title: child.title,
        icon: child.icon ? child.icon : 'table',
        path: child.activeRule ? child.activeRule + child.target : '',
        key: (key ? key + '-' + index : index).toString(),
        children: []
      })
      // 当存在次级菜单，继续递归处理
      if (child.children && child.children.length) {
        return recursiveMenus(child.children, arr[index].children, arr[index].key)
      }
    })
  }
  recursiveMenus(children, menus)
  return menus
}
// 计算各个微应用路由
export function generateRoutes (data) {
  let routes = {}
  function recursiveRoutes (data, map) {
    data.forEach((item, index) => {
      // 如果当前数据存在activeRule，则证明其为子应用的页面
      let key = item.activeRule.replace(/[/]/g, '')
      if (key) {
        if (!map[key]) map[key] = []
        map[key].push(item)
      }
      // 如果当前存在
      if (item.children && item.children.length) {
        return recursiveRoutes(item.children, map)
      }
    })
  }
  recursiveRoutes(data, routes)
  return routes
}
// 获取当前可加载的activeRule集合
export function generateActiveRule (rules, data) {
  // 当前菜单数据中存在的所有activeRule集合
  let arr = []
  // 递归遍历
  function handleRules (list) {
    list.forEach(item => {
      // 当该条数据存在activeRule，且集合中不存在该字段
      if (item.activeRule && !arr.includes(item.activeRule)) {
        arr.push(item.activeRule)
      }
      if (item.children && item.children.length) {
        return handleRules(item.children)
      }
    }) 
  }
  handleRules(data)
  
  // 遍历前端配置rules，按序寻找第一个存在的activeRule作为默认加载项目
  try {
    rules.forEach(rule => {
      if (arr.includes(rule)) {
        throw new Error(rule)
      }
    })
  } catch (error) {
    return error.message
  }
}
// 计算菜单openKeys
export function generateOpenKeys (key) {
  let openKeys = []
  let keys = key.split('-')
  for (let i = 0; i < keys.length; i++) {
    let temp = _.cloneDeep(keys)
    openKeys.push(temp.splice(0, i + 1).join('-'))
  }
  return openKeys
}
