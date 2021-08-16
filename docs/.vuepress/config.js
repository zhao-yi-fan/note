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
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'node', link: '/express/' },
      { text: 'zhufengweb', link: '/zhufengweb/' },
    ],
    sidebar: {
      '/express/': [
        {
          text: 'express',
          link: '/express/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: [

          ],
        },
      ],
      '/zhufengweb/': [
        {
          text: 'zhufengweb',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/zhufengweb/AJAX/README.md',
            '/zhufengweb/AXIOS/README.md',
            '/zhufengweb/DOM_Box_Model-JQ/DOM_Box_Model/README.md',
            '/zhufengweb/DOM_Box_Model-JQ/jquery/README.md',
            '/zhufengweb/DOM_Box_Model-JQ/waterfall/README.md',
          ]
        },
      ],
      '/flutter/': [
        {
          text: 'flutter',
          link: '/flutter/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/javascript/': [
        {
          text: 'javascript汇总',
          link: '/javascript/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/Koa/': [
        {
          text: 'Koa',
          link: '/Koa/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/mongoDB/': [
        {
          text: 'mongoDB',
          link: '/mongoDB/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/nginx/': [
        {
          text: 'nginx',
          link: '/nginx/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/TypeScript/': [
        {
          text: 'TypeScript',
          link: '/TypeScript/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/vnm-shop/': [
        {
          text: 'vnm-shop',
          link: '/vnm-shop/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/vue/': [
        {
          text: 'vue',
          link: '/vue/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/web/': [
        {
          text: 'web',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            '/web/css/README.md',
            '/web/html/README.md',
            '/web/javascript/README.md',
            '/web/jQuery/README.md',
            '/web/node.js/README.md',
            '/web/php/README.md',
          ]
        },
      ],
      '/webpack/': [
        {
          text: 'webpack',
          link: '/webpack/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/network-protocol/': [
        {
          text: '七层网络协议',
          link: '/network-protocol/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/wechat_mini/': [
        {
          text: '微信小程序',
          link: '/wechat_mini/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/websocket/': [
        {
          text: 'websocket',
          link: '/websocket/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '/git/': [
        {
          text: 'git',
          link: '/git/',
          collapsable: false,
          sidebarDepth: 1,
          children: [

          ],
        },
      ],
      '': [
        {
          text: 'note',
          path: '',
          collapsable: false,
          sidebarDepth: 1,
          children: [],
        },
      ],
    }
    // displayAllHeaders: true // 默认值：false
  },

}