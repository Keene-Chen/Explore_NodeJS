const readAida64 = require('aida64-to-json');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/aida64';

// 插入数据
function write_mongodb(data) {
  MongoClient.connect(url, (err, db) => {
    if (err)
      throw err;
    const dbo = db.db('aida64');
    dbo.collection('data').insertOne(data, (err, res) => {
      if (err)
        throw err;
      console.log('文档插入成功');
      db.close();
    });
  });
}

readAida64().then((data) => {
  try {
    write_mongodb(data);
  }
  catch (err) {
    console.error(err);
  }
});
