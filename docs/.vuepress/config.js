module.exports = {
  title: "zhaoyifan Docs",
  description: 'zhaoyifan Docs',
  base: '/note/',
  markdown: {
    lineNumbers: true, // 是否在每个代码块的左侧显示行号。
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        title: 'express',   // 必要的
        path: '/express/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'flutter',   // 必要的
        path: '/flutter/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'javascript汇总',   // 必要的
        path: '/javascript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'Koa',   // 必要的
        path: '/Koa/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'mongoDB',   // 必要的
        path: '/mongoDB/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'nginx',   // 必要的
        path: '/nginx/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'TypeScript',   // 必要的
        path: '/TypeScript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'vnm商城',   // 必要的
        path: '/vnm-shop/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'vue',   // 必要的
        path: '/vue/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      // {
      //   title: 'web前端',   // 必要的
      //   path: '/web/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      //   collapsable: false, // 可选的, 默认值是 true,
      //   sidebarDepth: 1,    // 可选的, 默认值是 1
      //   children: [

      //   ]
      // },
      // {
      //   title: 'web前端架构',   // 必要的
      //   path: '/zhufengweb/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      //   collapsable: false, // 可选的, 默认值是 true,
      //   sidebarDepth: 1,    // 可选的, 默认值是 1
      //   children: [

      //   ]
      // },
      {
        title: 'webpack',   // 必要的
        path: '/webpack/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
    ],
    // displayAllHeaders: true // 默认值：false
  }
}