/*
 * @Descripttion: 每一个页面的路由按照这种形式编写
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-09-27 17:34:59
 * @LastEditTime: 2020-09-28 18:22:03
 */

const demoPage = [
  {
    path: '/demo',
    name: '示例',
    meta: {
      title: '示例', // 页面标签中的标题
      scrollToTop: true,
      cantCheck: true, // true 不做权限校验，false 或不添加做权限校验
      // 导航面包屑内容
      breadcrumbList: [
        {name: '首页', path: ''},
        {name: '示例', path: ''}
      ]
    },
    component: () => import('@/module/views/Demo')
  }
]

export default demoPage;
