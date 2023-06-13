let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://127.0.0.1:27017/mydata';

MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建!');
    db.close();
});
