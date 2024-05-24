/**
 * @file    : app.js
 * @author  : KeeneChen
 * @date    : 2023.06.08-09:30:30
 * @details : express框架的基本使用
 */

const express = require('express');
const app = express();
const port = 3000;

/**
 ** app.METHOD(URL, CALLBACK)
 * @brief 定义路由的方法 请求方式+接口url
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/about', (req, res) => {
  res.send({ name: '小明', age: 18 });
});

// 所有请求方法(get,post)都走这个路由
app.all('/about', (req, res) => {
  res.send({ name: 'jackie', age: 18 });
});

/**
 * @brief 响应方法
 * res.download()	提示将要下载文件
 * res.end()	结束响应进程
 * res.json()	发送 JSON 响应
 * res.jsonp()	在 JSONP 的支持下发送 JSON 响应
 * res.redirect()	重定向请求
 * res.render()	呈现视图模板
 * res.send()	发送各种类型的响应
 * res.sendFile()	以八位元流形式发送文件
 * res.sendStatus()	设置响应状态码并以响应主体形式发送其字符串表示
 */

/**
 * @brief 路由路径可以是字符串、字符串模式或正则表达式
 * 字符串模式使用字符串的模式匹配,可以使用"?"、"+"、"*"和"()"来表示模式
 * 正则表达式使用正则表达式的模式匹配
 * 详细参考:https://expressjs.com/zh-cn/guide/routing.html
 */
// 此路由路径将匹配 acd 和 abcd
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

// 此路由路径将匹配 abcd、abbcd、abbbcd 等
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd');
});

// 此路由路径将匹配 abcd、abxcd、abRABDOMcd、ab123cd 等
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd');
});

// 此路由路径将匹配 /abe 和 /abcde
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e');
});

// 基于正则表达式的路由路径的示例：
// 此路由路径将匹配名称中具有“a”的所有路由
app.get(/a/, function (req, res) {
  res.send('/a/');
});

// 此路由路径将匹配 butterfly 和 dragonfly, 但是不匹配 butterflyman、dragonfly man 等
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
