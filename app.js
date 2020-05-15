var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //也是通过stream来输出的

var userRouter = require('./routes/user');
var blogRouter = require('./routes/blog');

const session = require('./middleware/session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 返回的都是个中间件
const ENV = process.env.NODE_ENV;
// 开发环境
if (ENV !== 'production') {
  app.use(logger('dev'));
} else {
  //  线上环境
  const logsFullName = path.resolve(__dirname, './', 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logsFullName, {
    flags: 'a',
  });
  app.use(
    logger('combined', {
      stream: writeStream,
    })
  );
}

// ::1 - - [12/Apr/2020:07:27:08 +0000] "GET /api/blog/list?admin=1 HTTP/1.1" 200 34 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
// 类似于 getPostData 只要有post请求过来 我们就可以用req.body接受
app.use(express.json());
// 另外的格式 表单提交什么的  post数据兼容其他格式
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 处理session
app.use(session());

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * 中间件
 * 1. app.use
 * 2. next
 * 登录
 * 使用 express-session 和 connect-redis
 * req.session保存登录信息 登录校验做成express中间件
 * 3.日志 morgan 自定义日志 console.log console.error
 * 4.中间件原理介绍
 */
