'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _appMiddleware = require('./middleware/appMiddleware');

var _appMiddleware2 = _interopRequireDefault(_appMiddleware);

var _errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

var _errorHandlerMiddleware2 = _interopRequireDefault(_errorHandlerMiddleware);

var _blogRoutes = require('./api/blog/blogRoutes');

var _blogRoutes2 = _interopRequireDefault(_blogRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// routes


// middleware

var PORT = process.env.PORT || 8080;

(0, _appMiddleware2.default)(app, _express2.default);

(0, _blogRoutes2.default)(app);

(0, _errorHandlerMiddleware2.default)(app);

app.listen(PORT, function () {
  return console.log('Server listening at http://localhost:' + PORT);
});

exports.default = app;
//# sourceMappingURL=index.js.map