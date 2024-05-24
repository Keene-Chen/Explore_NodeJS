const mongoose = require('mongoose');
const onlineWriteToDB = require('./onlineWriteToDB');
const fileWriteToDB = require('./fileWriteToDB');
const curd = require('./curd');
const repoModel = require('./repoModel');

const url = 'mongodb://192.168.8.9:27017/test';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => {
    console.log(`MongoDB Connected ${url}`);
  })
  .catch((err) => {
    console.log('MongoDB Connection Error', err);
  });

const db = mongoose.connection;
db.once('open', () => {
  console.log('数据库连接成功');
  // fileWriteToDB();
  // onlineWriteToDB();
  let res = repoModel.find({}).exec();
  res.then((data) => {
    data.sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    data.forEach((e) => {
      console.log(e.name);
    });
    db.close();
  });
});

db.once('error', () => {
  console.log('数据库错误');
});

db.once('close', () => {
  console.log('关闭数据库');
});
