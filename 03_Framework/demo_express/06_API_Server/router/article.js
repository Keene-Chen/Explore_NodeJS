/**
 * @file    : article.js
 * @author  : KeeneChen
 * @date    : 2023.06.12-14:31:29
 * @details : 文章路由模块
 */

// 导入 multer 和 path
const path = require('node:path');
const multer = require('multer');
const express = require('express');

const router = express.Router();

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 创建 multer 的实例
const uploads = multer({ dest: path.join(__dirname, '../uploads') });
// 导入需要的验证规则对象
const {
  add_article_schema,
  delete_article_schema,
  get_article_schema,
  update_article_schema,
} = require('../schema/article');
// 导入文章路由的处理函数模块
const article_handler = require('../router_handler/article');

// 发布新文章的路由
router.post(
  '/add',
  uploads.single('cover_img'),
  expressJoi(add_article_schema),
  article_handler.addArticle,
);

// 获取文章的列表数据
router.get('/list', article_handler.getArticleList);

// 根据 id 删除文章数据
router.get(
  '/delete/:id',
  expressJoi(delete_article_schema),
  article_handler.deleteArticleById,
);

// 根据 id 获取文章详情
router.get(
  '/:id',
  expressJoi(get_article_schema),
  article_handler.getArticleById,
);

// 根据 id 更新文章数据
router.post(
  '/edit',
  uploads.single('cover_img'),
  expressJoi(update_article_schema),
  article_handler.updateArticleById,
);

module.exports = router;
