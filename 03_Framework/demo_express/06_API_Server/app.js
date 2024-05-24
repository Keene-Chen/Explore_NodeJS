/**
 * @file    : app.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-12:26:21
 * @details : API Server 项目入口文件
 */

const express = require('express');
const cors = require('cors');
// 导入 Joi 来定义验证规则
const joi = require('joi');
// 导入配置文件
const config = require('./config');
// 导入解析 Token 的包
const { expressjwt: expressJWT } = require('express-jwt');
// 导入路由模块
const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
const artCateRouter = require('./router/artcate');
const articleRouter = require('./router/article');

// 创建 express 应用
const app = express();
const port = 3000;

// 跨域中间件配置
app.use(cors());
// 表单解析中间件配置 x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'));

/**
 * @function : res.cc(err, status = 1)
 * @desc : 全局中间件,响应错误数据
 * @param {Object} err : 错误对象
 * @param {Number} status : 状态码,默认为 1表示失败
 */
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // 状态描述,判断 err 是错误对象 还是字符串
      message: err instanceof Error ? err.message : err,
    });
  };

  next();
});

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//],
  })
);

// 路由中间件配置
// 导入并使用用户路由模块
app.use('/api', userRouter);
// 导入并使用用户信息的路由模块
app.use('/my', userinfoRouter);
// 导入并使用文章分类的路由模块
app.use('/my/article', artCateRouter);
// 导入并使用文章的路由模块
app.use('/my/article', articleRouter);

// 全局错误中间件配置
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');

  // 未知错误
  res.cc(err);
});

app.listen(port, () => {
  console.log(`api server running at http://localhost:${port}`);
});
