import navBar from './nav'
import sideBar from './sidebar'
export default {
  style: '@vuepress-reco/style-default',
  logo: '/logo.png',
  author: 'zhaoyifan',
  docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
  docsBranch: 'main',
  docsDir: 'example',
  lastUpdatedText: '',
  // series 为原 sidebar
  series: sideBar,
  navbar: navBar,
  // valineConfig 配置与 1.x 一致
  // valineConfig: {
  //   appId: 'xxx',
  //   appKey: 'xxx',
  //   placeholder: '填写邮箱可以收到回复提醒哦！',
  //   verify: true, // 验证码服务
  //   // notify: true,
  //   recordIP: true,
  //   // hideComments: true // 隐藏评论
  // },
}