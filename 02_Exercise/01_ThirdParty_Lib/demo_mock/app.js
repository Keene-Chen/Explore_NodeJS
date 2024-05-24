const Mock = require('mockjs');

let obj = {
  number: Mock.Random.integer(),
  name: Mock.Random.cname(),
  age: Mock.Random.integer(18, 35),
  grade: [
    { course: 'C', score: Mock.Random.float(35, 100, 1, 9) },
    { course: 'C++', score: Mock.Random.float(35, 100, 1, 9) },
    { course: 'C#', score: Mock.Random.float(35, 100, 1, 9) },
  ],
};

let arr = [];

arr.push(obj);
arr.push(obj);
arr.push(obj);

for (let i = 0; i < arr.length; i++) {
  let string = JSON.stringify(arr[i], null, '  ');
  console.log(string, ',');
}
