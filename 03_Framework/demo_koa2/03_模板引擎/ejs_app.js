/**
 * @file    : app.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-18:32:04
 * @details : koa中使用ejs模板引擎
 */

const path = require('node:path');
const Koa = require('koa');
const views = require('@ladjs/koa-views');

const app = new Koa();
const host = 'http://127.0.0.1';
const port = 3000;

// 加载模板引擎
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs',
  }),
);

app.use(async (ctx) => {
  const title = 'Hello Koa2 ejs';
  await ctx.render('index', { title });
});

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
