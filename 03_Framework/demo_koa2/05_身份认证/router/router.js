/**
 * @file    : router.js
 * @author  : KeeneChen
 * @date    : 2023.06.15-13:51:23
 * @details : router
 */

const Router = require('koa-router');

const router = new Router({ prefix: '/api' });

// 向session中存储数据
router.post('/login', async (ctx) => {
  // 判断用户提交的登录信息是否正确
  if (
    ctx.request.body.username !== 'KeeneChen' ||
    ctx.request.body.password !== '123'
  ) {
    return (ctx.body = { status: 1, msg: '登录失败' });
  }

  ctx.session.user = ctx.request.body; // 用户的信息
  ctx.session.islogin = true; // 用户的登录状态
  console.log(ctx.session);
  ctx.body = { status: 0, msg: '登录成功' };
});

// 从session中获取数据
router.get('/user', async (ctx) => {
  if (!ctx.session.islogin) {
    return (ctx.body = { status: 1, msg: 'fail' });
  }
  ctx.body = { status: 0, msg: 'success', username: ctx.session.user.username };
});

// 退出登录
router.post('/logout', async (ctx) => {
  console.log(ctx.session);
  ctx.session = null;
  ctx.body = { status: 0, msg: '退出成功' };
});

module.exports = router;
