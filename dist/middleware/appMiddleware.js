'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, express) {
  app.use(express.static('public'));
  app.use((0, _morgan2.default)('dev'));
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true })); // for url encoded form data
};
//# sourceMappingURL=appMiddleware.js.map