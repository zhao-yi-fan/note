const express = require('express');
const webpack = require('webpack');
// webpack中间件，在服务器端启动webpack
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

const compiler = webpack(require('./webpack.config'))

app.use(webpackDevMiddleware(compiler))

app.get('/user', (req, res) => {
  res.json({ name: 'tobi' });
})

app.listen(3000, () => {
  console.log('server is running');
})
