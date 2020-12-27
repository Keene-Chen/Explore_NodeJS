const Koa2 = require('koa2');
const app = new Koa2();
const host = 'http://localhost:';
const prot = 3000;

app.use(async (ctx) => {
  let url = ctx.url;
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;

  ctx.body = {
    url,
    req_query,
    req_querystring,
  };
  console.log(ctx.body);
});

app.listen(3000, () => {
  console.log(`${host}${prot}`);
});
