const readAida64 = require('aida64-to-json');
const fs = require('fs');

const filepath = './data.json';

readAida64().then((data) => {
    try {
        fs.writeFileSync(filepath, JSON.stringify(data));
        console.log('写入成功!');
    } catch (err) {
        console.error(err);
    }
});
