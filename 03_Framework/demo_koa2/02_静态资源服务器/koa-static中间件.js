/**
 * @file    : app.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-15:48:38
 * @details : koa-static中间件静态资源服务器
 */

const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const app = new Koa();

const host = 'http://127.0.0.1';
const port = 3000;

// 配置koa-static中间件
app.use(static(path.join(__dirname, './static')));

app.use(async (ctx) => {
  ctx.body = 'Hello Koa2';
});

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
