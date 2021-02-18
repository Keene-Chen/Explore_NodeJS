const axios = require('axios').default;

// 设置API地址和参数
const api_url = 'https://api.github.com';
const username = 'Keene-Chen';
const repo = 'KC_DMS';
const headers = {
  Authorization: 'Bearer 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', // 添加Bearer token进行身份验证，如果需要的话
  'Content-Type': 'application/json',
  'X-GitHub-Api-Version': '2022-11-28',
};

// 发送GET请求
axios
  .get(`${api_url}/user/starred`, { headers })
  .then((res) => {
    console.log(res.data[0]);
    // res.data.forEach((e) => {
    //   console.log(e.full_name);
    // });
  })
  .catch((err) => {
    console.error(err.res.data);
  });
