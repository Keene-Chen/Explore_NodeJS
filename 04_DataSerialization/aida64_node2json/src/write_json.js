const readAida64 = require('aida64-to-json');
const fs = require('fs');
const path = require('path');

async function getAidaValues() {
  const data = await readAida64();
  const filepath = path.join(__dirname, '../res/data.json');
  const rest = await fs.promises.writeFile(filepath, JSON.stringify(data));
  if (rest) throw new Error(rest);
  console.log('写入成功!');
}

(async () => {
  await getAidaValues();
})();
