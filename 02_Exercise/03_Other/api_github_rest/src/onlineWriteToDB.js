const mongoose = require('mongoose');
const getStars = require('./get_stars');
const repoModel = require('./repoModel');

/**
 * 将数据写入数据库
 * @returns {Promise<void>}
 * @description
 * 1. 从 GitHub 获取数据
 * 2. 将数据写入数据库
 * 3. 关闭数据库
 * @see https://mongoosejs.com/docs/connections.html#connection-events
 * @see https://mongoosejs.com/docs/api.html#model_Model.insertMany
 * @see https://mongoosejs.com/docs/api.html#model_Model.create
 * @see https://mongoosejs.com/docs/api.html#model_Model.save
 *
 */
async function onlineWriteToDB() {
  try {
    const stars = await getStars();
    const repoData = stars.map(({ repo, starred_at }) => ({
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      topics: repo.topics,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      language: repo.language,
      starred_at,
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

module.exports = onlineWriteToDB;
