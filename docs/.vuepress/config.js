
import { getDirname, path } from '@vuepress/utils'
import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { codeBlockPlugin } from "@yanyu-fe/vuepress-plugin-code-block";

const __dirname = getDirname(import.meta.url)
export default {
  title: "zhaoyifan Note",
  description: 'zhaoyifan zhaoyifan Note',
  base: '/note/',
  markdown: {
    // extendsMarkdown: md => {
    //   // 该扩展在图片自动加 ./  还有中文图片的查找
    //   md.use(require("markdown-it-disable-url-encode"));
    // },
    anchor: {
      permalink: true,
    }
  },
  theme: defaultTheme({
    repo: 'https://github.com/zhao-yi-fan/note/',
    // repoLabel: '', // 项目仓库的标签
    lastUpdated: '上次更新', // string | boolean
    navbar: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    // displayAllHeaders: true // 默认值：false
  }),
  plugins: [
    codeBlockPlugin(),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ],
  // 在使用 vuepress-vite 包的时候，你可以忽略这个字段，因为 Vite 是默认打包工具
  // Vite 打包工具的配置项
  bundlerConfig: {
    // 查看下方
  },

}