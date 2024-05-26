/**
 * @file    : user.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-15:24:37
 * @details : 用户登录注册路由
 */

const express = require('express');

const router = express.Router();

// 导入路由处理函数模块
const expressJoi = require('@escook/express-joi');
const user_handler = require('../router_handler/user');
// 导入验证表单数据的中间件
// 导入需要验证的规则对象
const { reg_login_schema } = require('../schema/user');

// 注册用户
router.post('/reguser', expressJoi(reg_login_schema), user_handler.reguser);

// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login);

module.exports = router;
