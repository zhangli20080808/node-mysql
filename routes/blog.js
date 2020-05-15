var express = require('express');
var router = express.Router();

const {
  getList,
  newBlog,
  getDetail,
  updateDeatil,
  deleteBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const loginCheck = require('../middleware/loginCheck');

/* GET users listing. */
router.get('/list', function (req, res, next) {
  let { keyword = '', author = '' } = req.query;

  if (req.query.admin) {
    // 强制查询自己的博客
    if (!req.session.username) {
      // 为登录
      res.json(new ErrorModel('未登录'));
      return;
    }
    author = req.session.username;
  }
  const result = getList(author, keyword);
  return result.then((resData) => {
    res.json(new SuccessModel(resData));
  });
});

router.get('/detail', (req, res, next) => {
  const { id } = req.query;
  const result = getDetail(id);
  return result.then((detail) => {
    res.json(new SuccessModel(detail));
  });
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const data = newBlog(req.body);
  return data.then((result) => {
    if (result) {
      res.json(new SuccessModel('创建成功'));
    }
  });
});

router.post('/update', loginCheck, (req, res, next) => {
  const { id } = req.query;
  const result = updateDeatil(id, req.body);
  return result.then((val) => {
    if (val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel('更新失败'));
    }
  });
});

router.post('/del', loginCheck, (req, res, next) => {
  const { id } = req.query;
  // id 当前用户
  // let author = 'zls';
  const author = req.session.username;
  const result = deleteBlog(id, author);
  return result.then((val) => {
    if (val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel('更新失败'));
    }
  });
});

module.exports = router;
