/**
 * @file app.js
 * @author KeeneChen
 * @date 2023.12.11-20:41:43
 * @details app
 */

import axios from 'axios';

// get请求
axios
  .get('https://httpbin.org/get')
  .then(response => {
    // 处理成功情况
    console.log(response.data);
  })
  .catch(error => {
    // 处理错误情况
    console.log(error);
  })
  .finally(() => {
    // 总是会执行
    console.log('请求结束');
  });

// post请求
axios
  .post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(response => {
    console.log(response.data);
  });

// 并发请求
axios.all([axios.get('https://httpbin.org/get'), axios.get('https://httpbin.org/get')]).then(
  axios.spread((res1, res2) => {
    console.log(res1.data);
    console.log(res2.data);
  })
);

// delete请求
axios.delete('https://httpbin.org/delete').then(response => {
  console.log(response.data);
});

// put请求
axios.put('https://httpbin.org/put', { firstName: 'Fred', lastName: 'Flintstone' }).then(response => {
  console.log(`${response.data}\n`);
});
console.log();

// patch请求
axios.patch('https://httpbin.org/patch', { firstName: 'Fred', lastName: 'Flintstone' }).then(response => {
  console.log(`${response.data}\n`);
});
