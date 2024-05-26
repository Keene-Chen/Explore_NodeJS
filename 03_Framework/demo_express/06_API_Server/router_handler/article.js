/**
 * @file    : article.js
 * @author  : KeeneChen
 * @date    : 2023.06.12-14:34:29
 * @details : 文章路由的处理函数模块
 */

// 导入数据库操作模块
const path = require('node:path');
const db = require('../db/mysql');
// 导入处理路径的 path 核心模块

// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req.file);
  if (!req.file || req.file.fieldname !== 'cover_img')
    return res.cc('文章封面是必选参数！');

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象
  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 文章封面的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章的发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.auth.id,
  };

  const insertSql = `insert into ev_articles set ?`;
  db.query(insertSql, articleInfo, (err, results) => {
    if (err)
      return res.cc(err);
    if (results.affectedRows !== 1)
      return res.cc('发布新文章失败！');
    res.cc('发布文章成功！', 0);
  });
};

// 获取文章的列表数据的处理函数
exports.getArticleList = (req, res) => {
  const querySql = `select * from ev_articles where is_delete=0 order by id desc`;
  db.query(querySql, (err, results) => {
    if (err)
      return res.cc(err);
    res.send({
      status: 0,
      message: '获取文章列表成功！',
      data: results,
    });
  });
};

// 根据 id 删除文章数据的处理函数
exports.deleteArticleById = (req, res) => {
  const deleteSql = `update ev_articles set is_delete=1 where id=?`;
  db.query(deleteSql, req.params.id, (err, results) => {
    if (err)
      return res.cc(err);
    if (results.affectedRows !== 1)
      return res.cc('删除文章失败！');
    res.cc('删除文章成功！', 0);
  });
};

// 根据 id 获取文章详情的处理函数
exports.getArticleById = (req, res) => {
  const querySql = `select * from ev_articles where id=?`;
  db.query(querySql, req.params.id, (err, results) => {
    if (err)
      return res.cc(err);
    if (results.length !== 1)
      return res.cc('获取文章详情失败！');
    res.send({
      status: 0,
      message: '获取文章详情成功！',
      data: results[0],
    });
  });
};

// 根据 id 更新文章数据的处理函数
exports.updateArticleById = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img')
    return res.cc('文章封面是必选参数！');

  // 处理文章的信息对象
  const articleInfo = {
    ...req.body,
    cover_img: path.join('/uploads', req.file.filename),
    pub_date: new Date(),
    author_id: req.auth.id,
  };

  const updateSql = `update ev_articles set ? where id=?`;
  db.query(updateSql, [articleInfo, req.body.id], (err, results) => {
    if (err)
      return res.cc(err);
    if (results.affectedRows !== 1)
      return res.cc('更新文章失败！');
    res.cc('更新文章成功！', 0);
  });
};
