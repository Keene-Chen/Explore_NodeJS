/**
 * @file    : artcate.js
 * @author  : KeeneChen
 * @date    : 2023.06.12-12:30:23
 * @details : 文章分类路由
 */

const express = require('express');

const router = express.Router();

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require('../schema/artcate');

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate');

// 获取文章分类列表数据
router.get('/cates', artcate_handler.getArticleCates);

// 新增文章分类的路由
router.post(
  '/addcates',
  expressJoi(add_cate_schema),
  artcate_handler.addArticleCates,
);

// 根据id删除文章分类的路由
router.get(
  '/deletecate/:id',
  expressJoi(delete_cate_schema),
  artcate_handler.deleteCateById,
);

// 根据id获取文章分类的路由
router.get(
  '/cates/:id',
  expressJoi(get_cate_schema),
  artcate_handler.getArtCateById,
);

// 根据id更新文章分类的路由
router.post(
  '/updatecate',
  expressJoi(update_cate_schema),
  artcate_handler.updateCateById,
);

module.exports = router;
