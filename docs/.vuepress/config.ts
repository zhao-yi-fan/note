import { defineUserConfig } from "vuepress";
import recoTheme from 'vuepress-theme-reco'
import themeConfig from './config/themeConfig'

export default defineUserConfig({
  title: "zhaoyifan Blog",
  description: 'zhaoyifan zhaoyifan Blog',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-35wm7P5Tff' }],
  ],
  theme: recoTheme(themeConfig),
  lang: 'zh-CN',
})