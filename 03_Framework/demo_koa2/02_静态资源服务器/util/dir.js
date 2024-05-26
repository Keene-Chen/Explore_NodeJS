/**
 * @file    : dir.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-12:57:32
 * @details : 读取目录内容
 */

const url = require('node:url');
const fs = require('node:fs');
const path = require('node:path');

// 遍历读取目录内容方法
const walk = require('./walk');

/**
 * 封装目录内容
 * @param  {string} url 当前请求的上下文中的url，即ctx.url
 * @param  {string} reqPath 请求静态资源的完整本地路径
 * @return {string} 返回目录内容，封装成HTML
 */
function dir(url, reqPath) {
  // 遍历读取当前目录下的文件、子目录
  const contentList = walk(reqPath);

  let html = `<ul>`;
  for (const [index, item] of contentList.entries()) {
    html = `${html}<li><a href="${
      url === '/' ? '' : url
    }/${item}">${item}</a></li>`;
  }
  html = `${html}</ul>`;

  return html;
}

module.exports = dir;
