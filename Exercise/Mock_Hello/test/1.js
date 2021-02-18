const Mock = require('mockjs');

var Random = Mock.Random;
console.log(Random.email());

console.log(Mock.mock('@email'));

console.log(Mock.mock({ email: '@email' }));
console.log(Random.time('A HH:mm:ss'));