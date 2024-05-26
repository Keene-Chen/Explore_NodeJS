/**
 * @file    : server.js
 * @author  : KeeneChen
 * @date    : 2023.06.15-13:17:32
 * @details : Koa2 跨域请求
 */

const path = require('node:path');
const Koa = require('koa');
const views = require('@ladjs/koa-views');
const koaStatic = require('koa-static');
const cors = require('koa-cors');
const router = require('./router/router');

const app = new Koa();
const host = 'http://127.0.0.1';
const port = 3000;

// 配置跨域
app.use(cors());

// 加载模板引擎
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs',
  }),
);

// 配置koa-static中间件
app.use(koaStatic(path.join(__dirname, './public')));

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
