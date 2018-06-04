'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blogModel = require('./blogModel');

var _blogModel2 = _interopRequireDefault(_blogModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getBlogs: function getBlogs(req, res) {
    res.json(_blogModel2.default.get());
  },
  getBlog: function getBlog(req, res) {
    res.json(_blogModel2.default.get(req.params.id));
  },
  postBlog: function postBlog(req, res) {
    res.json(_blogModel2.default.create(req.body));
  },
  putBlog: function putBlog(req, res) {
    res.json(_blogModel2.default.update(req.body));
  },
  deleteBlog: function deleteBlog(req, res) {
    res.json(_blogModel2.default.delete(req.params.id));
  }
};
//# sourceMappingURL=blogCtrls.js.map