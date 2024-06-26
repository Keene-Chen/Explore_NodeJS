/**
 * @file    : walk.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-12:59:28
 * @details : 遍历目录内容
 */

const fs = require('node:fs');
const mimes = require('./mimes');

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {Array} 目录内容列表
 */
function walk(reqPath) {
  const files = fs.readdirSync(reqPath);

  const dirList = [];
  const fileList = [];
  for (let i = 0, len = files.length; i < len; i++) {
    const item = files[i];
    const itemArr = item.split('.');
    const itemMime
      = itemArr.length > 1 ? itemArr[itemArr.length - 1] : 'undefined';

    if (typeof mimes[itemMime] === 'undefined')
      dirList.push(files[i]);
    else
      fileList.push(files[i]);
  }

  const result = dirList.concat(fileList);

  return result;
}

module.exports = walk;
