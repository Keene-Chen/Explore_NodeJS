/**
 * @file    : server.js
 * @author  : KeeneChen
 * @date    : 2023.06.09-10:18:14
 * @details : NodeJS 身份认证
 */

const express = require('express');
const session = require('express-session');
const apiRouter = require('./router/apiRouter');

const app = express();
const port = 3000;

app.use(
  session({
    secret: 'KeeneChen !^_^!', // secret 的值为任意字符串
    resave: false,
    saveUninitialized: true,
  }),
); // session 中间件配置
app.use(express.static('./public')); // 静态文件服务
app.use(express.urlencoded({ extended: false })); // 解析 POST 提交过来的表单数据
app.use('/api', apiRouter); // 挂载路由

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
