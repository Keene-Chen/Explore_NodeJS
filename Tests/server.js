const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hellochen');
  })
  .listen(8888);

console.log('Server runing at http://localhost:8888/');