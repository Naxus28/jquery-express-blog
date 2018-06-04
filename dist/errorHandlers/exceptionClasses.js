"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Exception = function Exception(message, status) {
  _classCallCheck(this, Exception);

  this.message = message;
  this.status = status;
};

;

var StorageException = function (_Exception) {
  _inherits(StorageException, _Exception);

  function StorageException(message, status) {
    _classCallCheck(this, StorageException);

    var _this = _possibleConstructorReturn(this, (StorageException.__proto__ || Object.getPrototypeOf(StorageException)).call(this, message, status));

    _this.name = "StorageException";
    return _this;
  }

  return StorageException;
}(Exception);

;

var ApiException = function (_Exception2) {
  _inherits(ApiException, _Exception2);

  function ApiException(message, status) {
    _classCallCheck(this, ApiException);

    var _this2 = _possibleConstructorReturn(this, (ApiException.__proto__ || Object.getPrototypeOf(ApiException)).call(this, message, status));

    _this2.name = "ApiException";
    return _this2;
  }

  return ApiException;
}(Exception);

;

exports.ApiException = ApiException;
exports.StorageException = StorageException;
//# sourceMappingURL=exceptionClasses.js.map