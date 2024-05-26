/**
 * @file    : app.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-12:20:48
 * @details : 原生Koa2静态资源服务器
 */

const path = require('node:path');
const Koa = require('koa');
const content = require('./util/content');
const mimes = require('./util/mimes');

const app = new Koa();
const host = 'http://127.0.0.1';
const port = 3000;

// 静态资源目录相对路径
const staticPath = './static';

// 解析资源类型
function parseMime(url) {
  let extName = path.extname(url);
  extName = extName ? extName.slice(1) : 'unknown';
  // ? 这里运用了ES6对象的计算属性
  return mimes[extName];
}

app.use(async (ctx) => {
  const fullStaticPath = path.join(__dirname, staticPath);

  // 获取静态资源的内容,可能为文件内容、目录、404
  const _content = await content(ctx, fullStaticPath);

  // 解析请求内容的类型
  const _mime = parseMime(ctx.url);

  // 如果有对应的文件类型就配置
  if (_mime)
    ctx.type = _mime;

  // 输出静态资源的内容
  if (_mime && _mime.includes('image/')) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200);
    ctx.res.write(_content, 'binary');
    ctx.res.end();
  }
  else {
    // 其他则输出文本
    ctx.body = _content;
  }
});

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
