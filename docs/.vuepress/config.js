module.exports = {
  title: "zhaoyifan Docs",
  description: 'zhaoyifan zhaoyifan Docs',
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
    repo: 'https://github.com/zhao-yi-fan/note/',
    // repoLabel: '', // 项目仓库的标签
    lastUpdated: '上次更新', // string | boolean
    navbar: [
      {
        text: 'Home',
        children: [
          {
            text: 'node相关',
            children: [
              '/express/README.md', '/Koa/README.md',
            ]
          },
          {
            text: '其他',
            children: [
              '/git/README.md',
              '/websocket/README.md',
              '/wechat_mini/README.md',
              '/network-protocol/README.md',
              '/webpack/README.md',
              '/vue/README.md',
              '/vnm-shop/README.md',
              '/TypeScript/README.md',
              '/nginx/README.md',
              '/mongoDB/README.md',
              '/javascript/README.md',
              '/flutter/README.md',
            ]
          },


        ],
      },
      {
        text: 'web',
        children: [
          '/web/css/README.md',
          '/web/html/README.md',
          '/web/javascript/README.md',
          '/web/jQuery/README.md',
          '/web/node.js/README.md',
          '/web/php/README.md',
        ],
      },
      {
        text: 'zhufengweb',
        children: [
          {
            text: '盒子模型及jquery',
            children: [
              '/zhufengweb/DOM_Box_Model-JQ/DOM_Box_Model/README.md',
              '/zhufengweb/DOM_Box_Model-JQ/jquery/README.md',
              '/zhufengweb/DOM_Box_Model-JQ/waterfall/README.md',
            ]
          },
          {
            text: '事件绑定、事件委托、发布订阅',
            children: [
              '/zhufengweb/event_binding-publish_subscribe-event-event_delegation/event_binding-publish_subscribe/README.md',
              '/zhufengweb/event_binding-publish_subscribe-event-event_delegation/event-event_delegation/README.md',
            ]
          },
          {
            text: 'this指向、正则、原型链、less、商品排序',
            children: [
              '/zhufengweb/prototype-THIS-shop_sort-regex/less/README.md',
              '/zhufengweb/prototype-THIS-shop_sort-regex/prototype-THIS/README.md',
              '/zhufengweb/prototype-THIS-shop_sort-regex/shop_sort/README.md',
            ]
          },
          {
            text: '变量提升、闭包、面向对象模型、this指向',
            children: [
              '/zhufengweb/variable_hoisting-closure-THIS-OOP/variable_hoisting-closure/README.md',
              '/zhufengweb/variable_hoisting-closure-THIS-OOP/oop/README.md',
              '/zhufengweb/variable_hoisting-closure-THIS-OOP/tool/README.md',
              '/zhufengweb/variable_hoisting-closure-THIS-OOP/summary/README.md',
            ]
          },
          {
            text: 'webapp',
            children: [
              '/zhufengweb/webapp/README.md',
            ]
          },
          {
            text: 'node和promise',
            children: [
              '/zhufengweb/NODE-PROMISE/NODE-promise/README.md',
              '/zhufengweb/NODE-PROMISE/promiseA+/README.md',
              '/zhufengweb/NODE-PROMISE/storage/README.md',
            ]
          },
          {
            text: '其他',
            children: [
              '/zhufengweb/AJAX/README.md',
              '/zhufengweb/AXIOS/README.md',
            ]
          },

        ]
      },
    ],
    sidebar: {
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

            '/zhufengweb/event_binding-publish_subscribe-event-event_delegation/event_binding-publish_subscribe/README.md',
            '/zhufengweb/event_binding-publish_subscribe-event-event_delegation/event-event_delegation/README.md',

            '/zhufengweb/prototype-THIS-shop_sort-regex/less/README.md',
            '/zhufengweb/prototype-THIS-shop_sort-regex/prototype-THIS/README.md',
            '/zhufengweb/prototype-THIS-shop_sort-regex/shop_sort/README.md',

            '/zhufengweb/variable_hoisting-closure-THIS-OOP/variable_hoisting-closure/README.md',
            '/zhufengweb/variable_hoisting-closure-THIS-OOP/oop/README.md',
            '/zhufengweb/variable_hoisting-closure-THIS-OOP/tool/README.md',
            '/zhufengweb/variable_hoisting-closure-THIS-OOP/summary/README.md',

            '/zhufengweb/webapp/README.md',

            '/zhufengweb/NODE-PROMISE/NODE-promise/README.md',
            '/zhufengweb/NODE-PROMISE/promiseA+/README.md',
            '/zhufengweb/NODE-PROMISE/storage/README.md',
          ]
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
      '/': [
        {
          text: 'note',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/git/README.md',
            '/websocket/README.md',
            '/wechat_mini/README.md',
            '/network-protocol/README.md',
            '/webpack/README.md',
            '/vue/README.md',
            '/vnm-shop/README.md',
            '/TypeScript/README.md',
            '/nginx/README.md',
            '/mongoDB/README.md',
            '/Koa/README.md',
            '/javascript/README.md',
            '/flutter/README.md',
            '/express/README.md',
          ],
        },
      ],
    }
    // displayAllHeaders: true // 默认值：false
  },
  plugins: [
    [
      '@vuepress/plugin-search', {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],

}