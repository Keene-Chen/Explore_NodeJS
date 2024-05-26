/**
 * @file    : token.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-11:16:32
 * @details : token
 */

/**
 * @desc JWT(json web token)
 * JWT 由三部分组成:header、payload、signature
 * header: 由两部分组成,token 类型和加密算法
 * payload: 由三部分组成,标准字段、公共字段、私有字段
 * signature: 由 header 和 payload 通过加密算法生成
 * 示例:
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 * eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjIzMjE2NjUyLCJleHAiOjE2MjMyMTY2NTJ9.
 * 8yYXZyRt4J1x5xXV9Jh7QzqO2g6U9g0Bq6Q8s6W5dTI
 *
 * @desc express-jwt
 * express-jwt 是一个 express 中间件,用于验证 token
 *
 * @desc jsonwebtoken
 * jsonwebtoken 是一个用于生成 token 的库
 *
 * @desc 客户端使用方式
 * 在HTTP请求头信息中添加Authorization字段,值为 Bearer <token>
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJWT } = require('express-jwt');

const app = express();
const port = 3000;

// 允许跨域资源共享
const cors = require('cors');

app.use(cors());

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// 定义密钥
const secretKey = 'KeeneChen !^_^!';
// 配置 express-jwt 中间件,除了 /api/ 路径下的请求,其他请求都需要验证 token
app.use(
  expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//],
  }),
);

// 登录接口
app.post('/api/login', (req, res) => {
  // 将 req.body 请求体中的数据,转存为 userinfo 常量
  const userinfo = req.body;
  if (userinfo.username !== 'KeeneChen' || userinfo.password !== '123') {
    return res.send({
      status: 400,
      message: '登录失败！',
    });
  }
  /**
   * @function jwt.sign()
   * @desc 在登录成功之后,调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
   * @param {object} payload - 载荷,用于存放用户信息
   * @param {string} secret - 密钥,用于加密 token
   * @param {object} options - 配置对象,可以配置当前 token 的有效期
   * @returns {string} token 字符串
   * @warning 千万不要把密码加密到 token 字符中
   */
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, {
    expiresIn: '30m',
  });
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串
  });
});

// 这是一个有权限的 API 接口
// 使用 req.user 获取用户信息,并使用 data 属性将用户信息发送给客户端
app.get('/admin/getinfo', (req, res) => {
//   console.log(req);
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.body.user, // 要发送给客户端的用户信息
  });
});

// 使用全局错误处理中间件,捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    });
  }
  res.send({
    status: 500,
    message: '未知的错误',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
