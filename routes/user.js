var express = require('express');
var router = express.Router();

const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

/* GET users listing. */
router.post('/login', function (req, res) {
  const { username, password } = req.body;
  const result = login(username, password);
  return result.then((loginData) => {
    if (loginData.username) {
      // 设置 session
      req.session.username = loginData.username;
      req.session.realname = loginData.realname;
      res.json(new SuccessModel());
      return;
    }
    res.json(new ErrorModel('登录失败'));
  });
});

router.get('/login-test', (req, res) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: 'success',
    });
    return;
  }
  res.json({
    errno: -1,
    msg: 'fail',
  });
});
// router.get('/session', (req, res) => {
//   const session = req.session;
//   if (session.num == null) {
//     session.num = 0;
//   }
//   session.num++;
//   res.json({
//     num:session.num
//   })
// });

module.exports = router;
