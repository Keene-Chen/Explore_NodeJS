/**
 * @file    : content.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-12:52:06
 * @details : 读取请求内容
 */

const path = require('node:path');
const fs = require('node:fs');

// 封装读取目录的方法
const dir = require('./dir');
// 封装读取文件内容的方法
const file = require('./file');

/**
 * @brief 获取静态资源内容
 * @param {object} ctx
 * @param {object} fullStaticPath
 */
async function content(ctx, fullStaticPath) {
  // 封装请求资源的完绝对径
  const reqPath = path.join(fullStaticPath, ctx.url);

  // 判断请求路径是否为存在目录或者文件
  const exist = fs.existsSync(reqPath);

  // 返回请求内容， 默认为空
  let content = '';

  if (!exist) {
    // 如果请求路径不存在，返回404
    content = '404 Not Found';
  }
  else {
    // 判断访问地址是文件夹还是文件
    const stat = fs.statSync(reqPath);

    if (stat.isDirectory()) {
      // 如果为目录，则渲读取目录内容
      content = dir(ctx.url, reqPath);
    }
    else {
      // 如果请求为文件，则读取文件内容
      content = await file(reqPath);
    }
  }

  return content;
}

module.exports = content;
