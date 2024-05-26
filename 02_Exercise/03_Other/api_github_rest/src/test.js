const fs = require('node:fs');
const mongoose = require('mongoose');
const repoModel = require('./model');

const filePath
  = 'E:\\ZM\\NodeJS\\Yarn_Project\\GitHub_REST_API\\res\\starred_repos.json';

function getStars() {
  console.log('ss');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('读取文件失败', err);
    }
    else {
      console.log('读取文件成功');
      console.log(JSON.parse(data));
      // return data;
    }
  });
}

getStars();
