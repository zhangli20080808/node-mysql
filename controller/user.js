const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/crypto');

const login = (username, password) => {
  username = escape(username);

  // 生成加加密密码
  password = genPassword(password);
  password = escape(password);
  //  PASSWORD insert的时候加
  const sql = `select username, realname from users where username=${username} and password=${password}`;

  return exec(sql).then((data) => {
    return data[0] || {};
  });
};

module.exports = {
  login,
};
