let ENV = process.env.NODE_ENV;
if (ENV === 'dev') {
  console.log('我是开发环境')
}
if (ENV === 'pro') {
  console.log('我是生产环境')
}
if (ENV === 'test') {
  console.log('我是测试环境')
}