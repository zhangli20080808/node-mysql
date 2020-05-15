const crypto = require('crypto');
//密匙
const SERECT_KEY = 'ZL_sg';

// md5 16尽职的方式
function md5(content) {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SERECT_KEY}`;
  return md5(str);
}

module.exports = {
  genPassword,
};
