/**
 * @file    : 03_获取GET请求数据.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-09:58:09
 * @details : 03_获取GET请求数据
 */

const Koa = require('koa');
const app = new Koa();

const host = 'http://127.0.0.1';
const port = 3000;

app.use(async (ctx) => {
  let url = ctx.url;

  // 从上下文的request对象中获取请求字符串
  let req_query = ctx.request.query;
  let req_querystring = ctx.request.querystring;

  // 从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
  };
});

app.listen(port, () => {
  console.log(`Koa2 is runing at ${host}:${port}`);
});
