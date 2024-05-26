/**
 * @file    : session.js
 * @author  : KeeneChen
 * @date    : 2023.06.15-17:20:45
 * @details : koa-session
 */

const path = require('node:path');
const Koa = require('koa');
const session = require('koa-session');
const static1 = require('koa-static');
const { koaBody } = require('koa-body');
const router = require('./router/router');

const app = new Koa();
const host = 'http://127.0.0.1';
const port = 3000;

// 配置session的中间件
app.keys = ['123'];

const CONFIG = {
  key: '123', // (string) cookie键名 (默认为koa.sess)
  // (number || 'session') maxAge(最大存储时间)以毫秒为单位(默认为1天)
  // 'session'结果为当会话/浏览器关闭时cookie过期
  // 警告: 如果会话cookie被盗，这个cookie永远不会过期
  maxAge: 86400000,
  autoCommit: true, // (boolean) 自动提交header中的set-cookie信息 (默认为 true)
  overwrite: true, // (boolean) 是否允许覆盖保存 (默认为 true)
  httpOnly: true, // (boolean) 禁止客户端调用脚本访问cookie (默认为 true)
  signed: true, // (boolean) cookie是否签名 (默认为 true)
  rolling: false, // (boolean) 是否在每个响应中都强制设置会话标识符cookie。过期时间重置为原始的maxAge，重置过期(默认为false)
  renew: false, // (boolean) 当会话即将过期时自动更新会话，以便我们始终可以让用户保持登录状态。(默认为false)
  secure: false, // (boolean) 安全cookie
  sameSite: null, // (string) session cookie的SameSite选项 (默认为null，不设置)
};
app.use(session(app));

// 配置koa-body中间件
app.use(koaBody({ urlencoded: true }));

// 配置路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 配置静态资源中间件
app.use(static1(path.join(__dirname, 'public')));

// 处理 404 错误
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = {
    error: '404 Not Found',
  };
});

// 处理 500 错误
app.use(async (ctx) => {
  ctx.status = 500;
  ctx.body = {
    error: '500 Internal Server Error',
  };
});

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
