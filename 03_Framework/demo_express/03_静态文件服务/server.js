/**
 * @file    : server.js
 * @author  : KeeneChen
 * @date    : 2023.06.08-18:42:47
 * @details : Express静态文件服务
 */

const express = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', './views');

// 静态文件服务
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { name: '张三', age: 18 });
});

app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  res.status(500).render('500');
  console.log(err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
