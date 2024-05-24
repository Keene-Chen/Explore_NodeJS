/**
 * @file    : 02_Koa2_Router.js
 * @author  : KeeneChen
 * @date    : 2023.06.12-21:41:52
 * @details : Koa2 Router
 */

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const host = 'http://localhost:';
const port = 3000;

router.get('/', async (ctx, next) => {
  ctx.body = 'GET Koa2 Router!';
});

router.post('/', async (ctx, next) => {
  ctx.body = 'POST Koa2 Router!';
});

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}${port}`);
});
