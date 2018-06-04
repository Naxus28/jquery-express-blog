'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blogCtrls = require('./blogCtrls');

var _blogCtrls2 = _interopRequireDefault(_blogCtrls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();


var getRoutes = function getRoutes() {
  router.route('/').get(_blogCtrls2.default.getBlogs).post(_blogCtrls2.default.postBlog);

  router.route('/:id').get(_blogCtrls2.default.getBlog).put(_blogCtrls2.default.putBlog).delete(_blogCtrls2.default.deleteBlog);

  return router;
};

exports.default = function (app) {
  return app.use('/blog', getRoutes());
};
//# sourceMappingURL=blogRoutes.js.map