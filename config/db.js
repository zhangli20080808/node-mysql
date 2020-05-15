// 获取环境变量
const env = process.env.NODE_ENV;
let MYSQL_CONF;
let REDIS_CONF;
let SECRET_CONF
// 配置
if (env === 'development') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'myblog',
  };
  // redis
  REDIS_CONF = {
    port: '6379',
    host: '127.0.0.1',
  };
  SECRET_CONF = 'ZL_TEST'
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'myblog',
  };
  // redis
  REDIS_CONF = {
    port: '6379',
    host: '127.0.0.1',
  };
  SECRET_CONF = 'ZL_PRO'
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
  SECRET_CONF
};
