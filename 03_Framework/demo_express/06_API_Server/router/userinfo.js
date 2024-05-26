/**
 * @file    : userinfo.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-15:24:46
 * @details : 用户信息路由
 */

const express = require('express');

const router = express.Router();
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要验证的规则对象
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require('../schema/user');
// 导入获取用户基本信息的处理函数
const userinfo_handler = require('../router_handler/userinfo');

// 获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo);

// 更新用户基本信息
router.post(
  '/userinfo',
  expressJoi(update_userinfo_schema),
  userinfo_handler.updateUserInfo,
);

// 更新用户密码
router.post(
  '/updatepwd',
  expressJoi(update_password_schema),
  userinfo_handler.updatePassword,
);

// 更新用户头像
router.post(
  '/update/avatar',
  expressJoi(update_avatar_schema),
  userinfo_handler.updateAvatar,
);

module.exports = router;
