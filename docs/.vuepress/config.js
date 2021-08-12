module.exports = {
  title: "zhaoyifan Docs",
  description: 'zhaoyifan Docs',
  base: '/note/',
  markdown: {
    // lineNumbers: true, // 是否在每个代码块的左侧显示行号。
    extendMarkdown: md => {
      // 该扩展在图片自动加 ./  还有中文图片的查找
      md.use(require("markdown-it-disable-url-encode"));
    },
    anchor: {
      permalink: false,
    }
  },
  themeConfig: {
    lastUpdated: '上次更新', // string | boolean
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        title: 'express',   // 必要的
        path: '/express/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [],
      },
      {
        title: 'flutter',   // 必要的
        path: '/flutter/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'javascript汇总',   // 必要的
        path: '/javascript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'Koa',   // 必要的
        path: '/Koa/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'mongoDB',   // 必要的
        path: '/mongoDB/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'nginx',   // 必要的
        path: '/nginx/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'TypeScript',   // 必要的
        path: '/TypeScript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'vnm商城',   // 必要的
        path: '/vnm-shop/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'vue',   // 必要的
        path: '/vue/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
      {
        title: 'web前端',   // 必要的
        path: '',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
          {
            title: 'css',   // 必要的
            path: '/web/css/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: []
          },
          {
            title: 'html',   // 必要的
            path: '/web/html/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: []
          },
          {
            title: 'javascript',   // 必要的
            path: '/web/javascript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: []
          },
          {
            title: 'jQuery',   // 必要的
            path: '/web/jQuery/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: []
          },
          {
            title: 'nodejs',   // 必要的
            path: '/web/node.js/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: []
          },
          {
            title: 'php',   // 必要的
            path: '/web/php/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: []
          },
        ]
      },
      // {
      //   title: 'web前端架构',   // 必要的
      //   path: '/zhufengweb/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      //   collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
      //   sidebarDepth: 1,    // 可选的, 默认值是 1
      //   children: [

      //   ]
      // },
      {
        title: 'webpack',   // 必要的
        path: '/webpack/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: []
      },
    ],
    // displayAllHeaders: true // 默认值：false
  },

}