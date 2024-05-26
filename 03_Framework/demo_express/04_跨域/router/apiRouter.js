/**
 * @file    : apiRouter.js
 * @author  : KeeneChen
 * @date    : 2023.06.09-10:42:54
 * @details : apiRouter
 */

const express = require('express');

const apiRouter = express.Router();

apiRouter.get('/get', (req, res) => {
  // 设置允许跨域的域名
  res.setHeader('Access-Control-Allow-Origin', 'http://hello-chen.cn');
  res.send('get');
});

apiRouter.post('/post', (req, res) => {
  res.send('post');
});

apiRouter.delete('/delete', (req, res) => {
  res.send('delete');
});

module.exports = apiRouter;
