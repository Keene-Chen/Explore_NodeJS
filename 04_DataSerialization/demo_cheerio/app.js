const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const pretty = require('pretty');

fs.readFile(path.join(__dirname, './bookmarks_2023_6_17.html'), 'utf-8', (err, data) => {
  if (err)
    throw err;
  const $ = cheerio.load(data);
  const dtTags = $('DL DT').text(); // 选择所有<DT>标签
  console.log(pretty(dtTags));
});
