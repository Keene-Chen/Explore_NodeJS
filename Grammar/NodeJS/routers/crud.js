/*
 * @Author: your name
 * @Date: 2020-09-09 23:39:41
 * @LastEditTime: 2020-09-10 08:30:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /temp/routers/crud.js
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const dataJsonPath = './public/json/1.json';

// 增加
router.post('/',(req,res)=>{
  fs.writeFile(dataJsonPath, JSON.stringify(req.body), (err) => {
    if (err) throw err;
  });
})
// 删除
router.delete('/',(req,res)=>{
  res.send(req.body);
})
// 修改

// 更新


module.exports = router;
