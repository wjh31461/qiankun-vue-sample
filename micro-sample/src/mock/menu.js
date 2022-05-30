const menu = [
  {
    title: '首页',
    icon: '',
    target: 'home',
    activeRule: '/micro-sample/',
    children: []
  },
  {
    title: '导航栏1',
    icon: '',
    target: '',
    activeRule: '',
    children: [
      {
        title: '二级菜单1',
        icon: '',
        target: '',
        activeRule: '',
        children: [
          {
            title: '三级菜单1',
            icon: '',
            target: 'subMenu1',
            activeRule: '/micro-sample/',
            children: []
          },
          {
            title: '三级菜单2',
            icon: '',
            target: 'subMenu2',
            activeRule: '/micro-sample/',
            children: []
          }
        ]
      },
      {
        title: '二级菜单2',
        icon: '',
        target: 'menu2',
        activeRule: '/micro-sample/',
        children: []
      }
    ]
  }
]

export default menu
