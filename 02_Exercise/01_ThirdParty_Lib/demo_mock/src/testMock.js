import Mock from 'mockjs';

const obj = {
  number: Mock.Random.integer(),
  name: Mock.Random.cname(),
  age: Mock.Random.integer(18, 35),
  grade: [
    { course: 'C', score: Mock.Random.float(35, 100, 1, 9) },
    { course: 'C++', score: Mock.Random.float(35, 100, 1, 9) },
    { course: 'C#', score: Mock.Random.float(35, 100, 1, 9) },
  ],
};

const arr = [];

arr.push(obj);
arr.push(obj);
arr.push(obj);

for (let i = 0; i < arr.length; i++) {
  const string = JSON.stringify(arr[i], null, '  ');
  console.log(string, ',');
}
