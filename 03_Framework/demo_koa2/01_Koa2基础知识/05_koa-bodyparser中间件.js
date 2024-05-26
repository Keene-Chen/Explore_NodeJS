/**
 * @file    : 05_koa-bodyparser中间件.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-10:33:33
 * @details : 05_koa-bodyparser中间件
 */

const Koa = require('koa');

const app = new Koa();
const bodyParser = require('koa-bodyparser');

const host = 'http://127.0.0.1';
const port = 3000;

// 配置bodyparser中间件
app.use(bodyParser());

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 当GET请求时候返回表单页面
    const html = `
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/">
          <p>userName</p>
          <input name="userName" /><br/>
          <p>nickName</p>
          <input name="nickName" /><br/>
          <p>email</p>
          <input name="email" /><br/>
          <button type="submit">submit</button>
        </form>
      `;
    ctx.body = html;
  }
  else if (ctx.url === '/' && ctx.method === 'POST') {
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
    ctx.body = ctx.request.body;
  }
  else {
    // 其他请求显示404
    ctx.body = '<h1>404 not found/h1>';
  }
});

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
