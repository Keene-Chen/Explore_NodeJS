const fs = require('node:fs');
const mongoose = require('mongoose');
const repoModel = require('./repoModel');

const filePath
  = 'E:\\ZM\\NodeJS\\Yarn_Project\\GitHub_REST_API\\res\\starred_repos.json';

function getStars(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err)
        reject(err);
      else
        resolve(JSON.parse(data));
    });
  });
}

/**
 * 将数据写入数据库
 */
async function fileWriteToDB() {
  try {
    const stars = await getStars(filePath).then((data) => {
      return data;
    });
    const repoData = stars.map(data => ({
      name: data.name,
      full_name: data.full_name,
      html_url: data.html_url,
      description: data.description,
      topics: data.topics,
      created_at: data.created_at,
      updated_at: data.updated_at,
      pushed_at: data.pushed_at,
      language: data.language,
      starred_at: data.starred_at,
    }));
    await repoModel.create(repoData);
    console.log('写入数据库成功');
  }
  catch (err) {
    console.error('写入数据库失败', err);
  }
  finally {
    mongoose.connection.close();
  }
}

module.exports = fileWriteToDB;
