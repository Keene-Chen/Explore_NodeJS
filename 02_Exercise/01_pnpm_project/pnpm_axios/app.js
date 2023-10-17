const axios = require('axios');
var url = 'http://httpbin.hello-chen.cn/post';

axios
  .post(url, { header: 'asdasd' })
  .then((response) => {
    console.log(response.status);
  })
  .catch((error) => {
    console.log(error);
  });
