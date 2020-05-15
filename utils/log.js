const fs = require('fs');
const path = require('path');

// 写日志  生成 write stream  拼接三个日志文件

function writeLog(writeStream, log) {
  writeStream.write(log + '\n'); //关键
}
function createWriteStream(fileName) {
  const fullName = path.resolve(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullName, {
    flags: 'a',
  });
  return writeStream;
}
// 写日志

const accessWriteStream = createWriteStream('access.log');
function access(log) {
  writeLog(accessWriteStream, log);
}
module.exports = {
  access,
};
