/**
 * @file    : 01_helloKoa2.js
 * @author  : KeeneChen
 * @date    : 2023.06.12-21:41:38
 * @details : Koa2 Hello World
 */

const Koa = require('koa');

const app = new Koa();
const host = 'http://localhost:';
const port = 3000;

app.use(async (ctx) => {
  ctx.body = 'Hello Koa2';
});

app.listen(3000, () => {
  console.log(`Koa2 is running at ${host}${port}`);
});
