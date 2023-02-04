import navBar from './nav'
import sideBar from './sidebar'
export default {
  style: '@vuepress-reco/style-default',
  logo: '/logo.png',
  author: 'zhaoyifan',
  authorAvatar: '/logo.png',
  docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
  docsBranch: 'main',
  docsDir: 'example',
  lastUpdatedText: '',
  // series 为原 sidebar
  series: sideBar,
  navbar: navBar,
  commentConfig: {
    type: 'valine',
    options: {
      appId: 'XlDa3SMzVdHX86i7xQxEyIDs-gzGzoHsz',
      appKey: 'gtXb5b8EgNs7X6yOnnXSf9gC',
      placeholder: '填写邮箱可以收到回复提醒哦！',
      verify: true, // 验证码服务
      // notify: true, //
      recordIP: true,
      // hideComments: true
    },
  },
}