/**
 * @file    : pug_app.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-18:42:53
 * @details : koa使用pug模板引擎
 */

const path = require('node:path');
const Koa = require('koa');
const views = require('@ladjs/koa-views');

const app = new Koa();
const host = 'http://127.0.0.1';
const port = 3000;

// 加载pug模板引擎
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'pug',
  }),
);

app.use(async (ctx) => {
  const title = 'Hello Koa2 pug';
  await ctx.render('index', { title });
});

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
