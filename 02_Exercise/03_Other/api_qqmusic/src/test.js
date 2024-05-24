const axios = require('axios');
const fs = require('fs');
const path = require('path');

const baseURL = 'http://localhost:3300';
const apiURL = '/lyric';
const url = baseURL + apiURL;

axios
  .post(url, { songmid: '0039MnYb0qxYhV' })
  .then((res) => {
    // console.log(res.data.data.lyric);
    // 将结果写入文件
    fs.writeFile(
      path.join(__dirname, './lyric.txt'),
      res.data.data.lyric,
      (err) => {
        if (err) throw err;
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });
