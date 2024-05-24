/**
 * @file    : apiRouter.js
 * @author  : KeeneChen
 * @date    : 2023.06.09-22:51:07
 * @details : apiRouter
 */

const express = require('express');
const apiRouter = express.Router();

// 向session中存储数据
apiRouter.post('/login', (req, res) => {
  console.log(req.body.username, req.body.password);
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'KeeneChen' || req.body.password !== '123') {
    return res.send({ status: 1, msg: '登录失败' });
  }

  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body; // 用户的信息
  req.session.islogin = true; // 用户的登录状态

  res.send({ status: 0, msg: '登录成功' });
});

// 从session中获取数据
apiRouter.get('/user', (req, res) => {
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' });
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  });
});

// 退出登录
apiRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.send({ status: 0, msg: '退出成功' });
});

module.exports = apiRouter;
