const os = require('node:os');
const path = require('node:path');

console.log(os.arch() + os.homedir());
console.log(os.cpus());
console.log(os.freemem());
console.log(os.hostname());
console.log(os.networkInterfaces());

console.log(__dirname + __filename);
