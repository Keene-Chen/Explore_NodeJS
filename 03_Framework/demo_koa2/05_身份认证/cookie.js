/**
 * @file    : cookie.js
 * @author  : KeeneChen
 * @date    : 2023.06.15-13:53:45
 * @details : cookie
 */

const Koa = require('koa');
const app = new Koa();

const host = 'http://127.0.0.1';
const port = 3000;

app.use(async (ctx) => {
  if (ctx.url === '/index' && ctx.method === 'GET') {
    ctx.cookies.set('cid', 'hello world', {
      domain: '127.0.0.1', // 写cookie所在的域名
      path: '/index', // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date('2017-02-15'), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false, // 是否允许重写
    });
    ctx.body = 'cookie is ok';
  } else {
    ctx.body = 'hello world';
  }
});

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
