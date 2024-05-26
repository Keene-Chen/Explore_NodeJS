/**
 * @file    : 04_获取POST请求的表单数据.js
 * @author  : KeeneChen
 * @date    : 2023.06.13-10:09:58
 * @details : 04_获取POST请求的表单数据
 */

/**
 * 对于POST请求的处理,koa2没有封装获取参数的方法,需要通过解析上下文context中的原生node.js请求对象req,
 * 将POST表单数据解析成query string（例如：a=1&b=2&c=3）,再将query string 解析成JSON格式
 * （例如：{"a":"1", "b":"2", "c":"3"}）
 */

const Koa = require('koa');

const app = new Koa();

const host = 'http://127.0.0.1';
const port = 3000;

// 全局中间件
app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 当使用GET请求的时候返回表单页面
    const html = ` <h1>koa2 request post demo</h1>
    <form method="POST" action="/">
      <p>userName</p>
      <input name="userName" /><br/>
      <p>nickName</p>
      <input name="nickName" /><br/>
      <p>email</p>
      <input name="email" /><br/>
      <button type="submit">submit</button>
    </form>`;

    ctx.body = html;
  }
  else if (ctx.url === '/' && ctx.method === 'POST') {
    // 当使用POST请求时解析表单数据并显示
    const postData = await parsePostData(ctx);
    ctx.body = postData;
  }
  else {
    // 其他请求显示404
    ctx.body = '<h1>404 not found</h1>';
  }
});

// 解析上下文里面提供的node原生请求的POST参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = '';
      ctx.req.addListener('data', (data) => {
        postdata += data;
      });
      ctx.req.addListener('end', () => {
        resolve(parseQueryStr(postdata));
      });
    }
    catch (err) {
      reject(err);
    }
  });
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
  const queryData = {};
  const queryStrList = queryStr.split('&');
  console.log(queryStrList);
  for (const [index, queryStr] of queryStrList.entries()) {
    const itemList = queryStr.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData;
}

app.listen(port, () => {
  console.log(`Koa2 is running at ${host}:${port}`);
});
