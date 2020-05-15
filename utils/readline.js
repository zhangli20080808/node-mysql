const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件名
const fullName = path.resolve(__dirname, '../', '../', 'logs', 'access.log');
// 创建 read stream
const readStream = fs.createReadStream(fullName);
// 创建一个 readline 对象
const rl = readline.createInterface({
  input: readStream,
});
let chromeNum = 0;
let sum = 0;

// 读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return;
  }
  // 记录总行数
  sum++;

  const arr = lineData.split(' -- ');
  console.log(arr,'arr');
  
  if (arr[1] && arr[1].indexOf('Chrome') > 0) {
    chromeNum++;
  }
});

rl.on('close', () => {
  console.log(chromeNum,sum);
  console.log(`占比${chromeNum / sum}`);
});
