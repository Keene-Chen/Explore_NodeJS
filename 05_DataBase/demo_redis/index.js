const redis = require('redis');
const client = redis.createClient(6379, 'hello-chen.cn');
// client.auth(123456); // 如果没有设置密码 是不需要这一步的
/* client.on('connect', function () {
  // set 语法
  client.set('name', 'long', function (err, data) {
    console.log(data);
  });
  // get 语法
  client.get('name', function (err, data) {
    console.log(data);
  });
}); */

client.on('error', (err) => {
  console.error(err);
});

client.set('name', 'dsad', (err, ret) => {
  console.log(ret);
});

client.get('name1', redis.print);

