const axios = require('axios');
const tunnel = require('tunnel');
const config = require('./config');

// 代理设置
const agent = tunnel.httpsOverHttp({
  proxy: config.proxy,
});

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
  },
  httpsAgent: agent,
  proxy: false,
});

const prompt = 'hello world';

async function getCompletion() {
  try {
    const result = await openai.post('/chat/completions', {
      model: 'gpt-3.5-turbo-16k',
      messages: [{ role: 'user', content: 'say hello' }],
      max_tokens: 4096,
      temperature: 0.9,
    });
    return result;
    // console.log(result.data);
  }
  catch (error) {
    console.error(error);
  }
}

/* getCompletion()
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  }); */

// 列出所有模型
openai
  .get('/models')
  .then((res) => {
    const ids = res.data.data.map(e => e.id); // 获取所有id
    ids.sort(); // 对id进行排序
    ids.forEach(id => console.log(id)); // 打印排好序的id
  })
  .catch((err) => {
    console.error(err);
  });
