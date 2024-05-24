/**
 * @file    : router.js
 * @author  : KeeneChen
 * @date    : 2023.06.15-13:21:04
 * @details : router
 */

const Router = require('koa-router')();

Router.get('/get', async (ctx) => {
  // 设置允许跨域的域名
  ctx.set('Access-Control-Allow-Origin', 'http://hello-chen.cn');
  ctx.body = 'get';
});

Router.post('/post', async (ctx) => {
  ctx.body = 'post';
});

Router.delete('/delete', async (ctx) => {
  ctx.body = 'delete';
});

Router.use('/api', Router.routes(), Router.allowedMethods());

module.exports = Router;
