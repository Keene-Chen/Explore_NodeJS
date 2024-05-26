/**
 * @file    : file.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-12:58:25
 * @details : 读取文件内容
 */

const fs = require('node:fs');

/**
 * 读取文件方法
 * @param  {string} filePath 文件本地的绝对路径
 * @return {string|binary}
 */
function file(filePath) {
  //   let content = fs.readFileSync(filePath, 'binary');
  const content = fs.readFileSync(filePath);
  return content;
}

module.exports = file;
