// 单利
const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF);
// 开始连接
con.connect();

// 统一执行sql的语句
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  return promise;
}

module.exports = {
  exec,
  escape: mysql.escape,
};
