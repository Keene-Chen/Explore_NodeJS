/**
 * @file    : userinfo.js
 * @author  : KeeneChen
 * @date    : 2023.06.11-18:57:36
 * @details : 用户信息处理函数模块
 */

// 导入数据库操作模块
const bcrypt = require('bcryptjs');
const db = require('../db/mysql');
// 导入加密模块

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  const querySql = `select id, username, nickname, email, user_pic from ev_users where id=?`;
  /**
   * ? 此处的req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
   * express-jwt中间件 8.x 版本挂载的是req.auth
   * express-jwt中间件 7.x 版本挂载的是req.user
   */
  db.query(querySql, req.auth.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err)
      return res.cc(err);
    // 执行 SQL 语句成功,但是查询到的数据条数不等于 1
    if (results.length !== 1)
      return res.cc('获取用户信息失败!');
    // 将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取用户信息成功!',
      data: results[0],
    });
  });
};

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  const updateSql = `update ev_users set ? where id=?`;
  db.query(updateSql, [req.body, req.auth.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err)
      return res.cc(err);
    // 执行 SQL 语句成功,但是影响行数不等于 1
    if (results.affectedRows !== 1)
      return res.cc('更新用户信息失败!');
    // 更新用户信息成功
    res.cc(0, '更新用户信息成功!');
  });
};

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  // 定义根据 id 查询用户数据的 SQL 语句
  const querySql = `select * from ev_users where id=?`;

  // 执行 SQL 语句查询用户是否存在
  db.query(querySql, req.auth.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err)
      return res.cc(err);

    // 检查指定 id 的用户是否存在
    if (results.length !== 1)
      return res.cc('用户不存在！');

    // 判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password,
    );
    if (!compareResult)
      return res.cc('原密码错误！');

    // 对新密码进行 bcrypt 加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    const updateSql = `update ev_users set password=? where id=?`;
    db.query(updateSql, [newPwd, req.auth.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err)
        return res.cc(err);
      // 执行 SQL 语句成功,但是影响行数不等于 1
      if (results.affectedRows !== 1)
        return res.cc('更新密码失败!');
      // 更新密码成功
      res.cc(0, '更新密码成功!');
    });
  });
};

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const updateSql = `update ev_users set user_pic=? where id=?`;
  console.log([req.body.avatar, req.auth.id]);
  db.query(updateSql, [req.body.avatar, req.auth.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err)
      return res.cc(err);
    // 执行 SQL 语句成功,但是影响行数不等于 1
    if (results.affectedRows !== 1)
      return res.cc('更新头像失败!');
    // 更新头像成功
    res.cc(0, '更新头像成功!');
  });
};
