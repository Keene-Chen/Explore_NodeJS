const Mock = require('mockjs')

let Random = Mock.Random;
for (let i = 0; i < 10; i++) {
    console.log(Random.cname());
}

