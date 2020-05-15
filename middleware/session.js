var session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisCliet = require('../db/redis');
const { SECRET_CONF } = require('../config/db');

const sessionStore = new RedisStore({
  client: redisCliet,
});
const sessionMiddleWare = session({
  secret: SECRET_CONF,
  cookie: {
    path: '/', //默认配置
    httpOnly: true, //默认配
    // maxAge 传入失效的时间
    maxAge: 24 * 60 * 60 * 1000,
    // resave是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    resave: false,
    // saveUninitialized是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    saveUninitialized: false,
  },
  store: sessionStore,
});

module.exports = function (options) {
  return function (req, res, next) {
    sessionMiddleWare(req, res, next);
  };
};
