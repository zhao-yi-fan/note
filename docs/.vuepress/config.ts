import { defineUserConfig } from "vuepress";
import recoTheme from 'vuepress-theme-reco'
import themeConfig from './config/themeConfig'

export default defineUserConfig({
  title: "zhaoyifan Note",
  description: 'zhaoyifan zhaoyifan Note',
  theme: recoTheme(themeConfig),
})