const demoPage = [
  {
    path: '/demo',
    name: '示例',
    meta: {
      title: '示例',
      scrollToTop: true,
      cantCheck: true,
      breadcrumbList: [
        {name: '首页', path: ''},
        {name: '示例', path: ''}
      ]
    },
    component: () => import('@/module/views/Demo')
  }
]

export default demoPage
