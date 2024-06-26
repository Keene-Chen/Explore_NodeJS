/**
 * @file    : artcate.js
 * @author  : KeeneChen
 * @date    : 2023.06.12-12:32:06
 * @details : 文章分类处理函数模块
 */

// 导入数据库操作模块
const e = require('express');
const db = require('../db/mysql');

// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
  // 根据分类的状态，获取所有未被删除的分类列表数据
  const querySql
    = 'select * from ev_article_cate where is_delete=0 order by id asc';
  db.query(querySql, (err, results) => {
    if (err)
      return res.cc(err);

    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results,
    });
  });
};

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  // 查询分类名称与别名是否被占用
  const querySql = 'select * from ev_article_cate where name=? or alias=?';
  db.query(querySql, [req.body.name, req.body.alias], (err, results) => {
    if (err)
      return res.cc(err);
    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2)
      return res.cc('分类名称与别名被占用，请更换后重试！');
    // 分别判断 分类名称 和 分类别名 是否被占用
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc('分类名称被占用，请更换后重试！');
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc('分类别名被占用，请更换后重试！');

    // 实现新增文章分类的功能
    const insertSql = 'insert into ev_article_cate set ?';
    db.query(insertSql, req.body, (err, results) => {
      if (err)
        return res.cc(err);
      if (results.affectedRows !== 1)
        return res.cc('新增文章分类失败！');
      res.cc(0, '新增文章分类成功！');
    });
  });
};

// 根据id删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  console.log(req.params.id);
  // 定义删除文章分类的 SQL 语句
  const delSql = 'update ev_article_cate set is_delete=1 where id=?';
  // 执行删除文章分类的 SQL 语句
  db.query(delSql, req.params.id, (err, results) => {
    if (err)
      return res.cc(err);
    if (results.affectedRows !== 1)
      return res.cc('删除文章分类失败！');
    res.cc(0, '删除文章分类成功！');
  });
};

// 根据id获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
  // 定义获取文章分类的 SQL 语句
  const querySql = 'select * from ev_article_cate where id=?';
  // 执行获取文章分类的 SQL 语句
  db.query(querySql, req.params.id, (err, results) => {
    if (err)
      return res.cc(err);
    if (results.length !== 1)
      return res.cc('获取文章分类数据失败！');
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0],
    });
  });
};

// 根据id更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  // 定义查重的 SQL 语句
  const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`;
  // 调用 db.query() 执行查重的 SQL 语句
  db.query(
    sql,
    [req.body.id, req.body.name, req.body.alias],
    (err, results) => {
      // 执行 SQL 语句失败
      if (err)
        return res.cc(err);

      // 判断名称和别名被占用的4种情况
      if (results.length === 2)
        return res.cc('分类名称与别名被占用，请更换后重试！');
      if (
        results.length === 1
        && results[0].name === req.body.name
        && results[0].alias === req.body.alias
      )
        return res.cc('分类名称与别名被占用，请更换后重试！');
      if (results.length === 1 && results[0].name === req.body.name)
        return res.cc('分类名称被占用，请更换后重试！');
      if (results.length === 1 && results[0].alias === req.body.alias)
        return res.cc('分类别名被占用，请更换后重试！');

      // 定义更新文章分类的 SQL 语句
      const sql = `update ev_article_cate set ? where id=?`;
      // 执行更新文章分类的 SQL 语句
      db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err)
          return res.cc(err);
        if (results.affectedRows !== 1)
          return res.cc('更新文章分类失败！');
        res.cc('更新文章分类成功！', 0);
      });
    },
  );
};
