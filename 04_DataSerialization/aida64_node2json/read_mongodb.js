const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://keenechen:27017/mydata';

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err;
  const dbo = db.db('mydata');
  dbo.collection('data')
    .find({})
    .toArray((err, result) => {
      // 返回集合中所有数据
      if (err)
        throw err;
      console.log(result);
      db.close();
    });
});
