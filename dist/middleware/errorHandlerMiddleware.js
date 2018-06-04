'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorHandler = function errorHandler(err, req, res, next) {
  var status = err.status,
      name = err.name,
      message = err.message;

  console.log('error: ', name);
  console.log('status: ', status || 500);

  res.status(status || 500).json({
    name: name,
    message: message
  });
};

exports.default = function (app) {
  return app.use(errorHandler);
};
//# sourceMappingURL=errorHandlerMiddleware.js.map