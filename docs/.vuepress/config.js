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
        title: 'express',
        path: '/express/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [],
      },
      {
        title: 'flutter',
        path: '/flutter/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'javascript汇总',
        path: '/javascript/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'Koa',
        path: '/Koa/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'mongoDB',
        path: '/mongoDB/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'nginx',
        path: '/nginx/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'TypeScript',
        path: '/TypeScript/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'vnm商城',
        path: '/vnm-shop/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'vue',
        path: '/vue/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'web前端',
        path: '',
        collapsable: true,
        sidebarDepth: 3,
        children: [
          {
            title: 'css',
            path: '/web/css/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
          {
            title: 'html',
            path: '/web/html/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
          {
            title: 'javascript',
            path: '/web/javascript/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
          {
            title: 'jQuery',
            path: '/web/jQuery/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
          {
            title: 'nodejs',
            path: '/web/node.js/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
          {
            title: 'php',
            path: '/web/php/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
        ]
      },
      {
        title: '珠峰web前端架构',
        path: '',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          {
            title: 'ajax',
            path: '/zhufengweb/AJAX/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
          {
            title: 'axios',
            path: '/zhufengweb/AXIOS/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
          },
          {
            title: 'DOM_Box_Model-JQ',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              {
                title: 'DOM_Box_Model',
                path: '/zhufengweb/DOM_Box_Model',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                  
                ]
              },
            ]
          },
        ]
      },
      {
        title: 'webpack',
        path: '/webpack/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: '七层网络协议',
        path: '/network-protocol/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: '微信小程序',
        path: '/wechat_mini/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'websocket',
        path: '/websocket/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
      {
        title: 'git',
        path: '/git/',
        collapsable: false,
        sidebarDepth: 1,
        children: []
      },
    ],
    // displayAllHeaders: true // 默认值：false
  },

}