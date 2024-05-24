/**
 * @file    : server.js
 * @author  : KeeneChen
 * @date    : 2023.06.08-15:22:33
 * @details : NodeJS Express 模板引擎
 */

const express = require('express');
const app = express();
const port = 3000;

/* // 设置模板引擎
app.set('view engine', 'hbs');

// 设置模板目录
app.set('views', './hbs');

app.get('/', (req, res) => {
  // 渲染index.hbs模版
  res.render('index');
});

app.get('/about', (req, res) => {
  // 渲染about.hbs模版
  res.render('about', {
    name: 'KeeneChen',
    age: 18,
  });
}); */

// app.set('view engine', 'jade');
// app.set('views', './jade');

app.set('view engine', 'ejs');
app.set('views', './ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'KeeneChen',
    age: 18,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
