/**
 * @file    : app.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-12:26:21
 * @details : API Server 项目入口文件
 */

const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');
// 导入 Joi 来定义验证规则
const joi = require('joi');

const app = express();
const port = 3000;

// 跨域中间件配置
app.use(cors());
// 表单解析中间件配置
app.use(express.urlencoded({ extended: false }));

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

// 路由中间件配置
app.use('/api', userRouter);

// 全局错误中间件配置
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 未知错误
  res.cc(err);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
