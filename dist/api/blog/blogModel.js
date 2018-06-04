'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _exceptionClasses = require('../../errorHandlers/exceptionClasses');

var _apiHelpers = require('../apiHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var to hold the post
var posts = [];

exports.default = {
  create: function create(_ref) {
    var title = _ref.title,
        content = _ref.content,
        author = _ref.author,
        _ref$publishDate = _ref.publishDate,
        publishDate = _ref$publishDate === undefined ? Date.now() : _ref$publishDate,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? _uuid2.default.v4() : _ref$id;


    // if request is invalid this function throws an exception
    (0, _apiHelpers.validateApiRequest)(arguments['0']);

    var post = {
      id: id,
      title: title,
      content: content,
      author: author,
      publishDate: publishDate
    };
    posts.push(post);

    return post;
  },
  get: function get() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    // if there is an id, find specific post
    if (id) {
      return posts.find(function (post) {
        return post.id === id;
      });
    }

    // if no id is passed, return all posts in achronological order
    return posts.sort(function (a, b) {
      return b.publishDate - a.publishDate;
    });
  },
  delete: function _delete(id) {
    var postIndex = posts.findIndex(function (post) {
      return post.id === id;
    });

    if (postIndex > -1) {
      posts.splice(postIndex, 1);
    } else {
      throw new _exceptionClasses.StorageException('Can\'t delete item `' + id + '` because it doesn\'t exist.', 400);
    }
  },
  update: function update(updatedPost) {
    var id = updatedPost.id;

    var postIndex = posts.findIndex(function (post) {
      return post.id === id;
    });

    if (postIndex === -1) {
      throw new _exceptionClasses.StorageException('Can\'t update item `' + id + '` because it doesn\'t exist.', 400);
    }

    // replace the old post with the new
    posts[postIndex] = updatedPost;

    // return the updated post
    return updatedPost;
  }
};
//# sourceMappingURL=blogModel.js.map