/**
 * @file    : http.js
 * @author  : KeeneChen
 * @date    : 2023.06.08-09:30:59
 * @details : nodejs 原生http模块的基本使用
 */

const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('hello world')
})

server.listen(3000, () => {
  console.log('服务已启动...');
})