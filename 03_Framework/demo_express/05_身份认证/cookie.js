/**
 * @file    : cookie.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-10:56:31
 * @details : cookie-parser 中间件配置
 */

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// cookie-parser 中间件配置
app.use(cookieParser());

// 设置 cookie
app.get('/set', (req, res) => {
  res.cookie('isLogin', 'True', { maxAge: 1000 * 60 * 60 * 24 * 7 });
  res.send('cookie 设置成功');
});

// 获取 cookie
app.get('/get', (req, res, next) => {
  let isLogin = req.cookies.isLogin;
  console.log(isLogin);
  res.send('isLogin:' + isLogin);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
