const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://hello-chen.cn:27017';

MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) throw err;
    console.log('MongoDB Connect...');

    const dbo = db.db('MyDB');
    const data = {
      name: 'hellochen',
      sex: true,
      age: 18,
      number: 18204043,
      Depart: '电子工程系',
    };

    dbo.collection('MyDB').insertOne(data);

    dbo
      .collection('MyDB')
      .find({})
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
      });
  }
);
