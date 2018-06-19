class Exception {
  constructor(message, status) {
    this.message = message;
    this.status = status;
    this.name = "Exception";
  }
};

class StorageException extends Exception {
  constructor(message, status) {
    super(message, status);
    this.name = "StorageException";
  }
};

class ApiException extends Exception {
  constructor(message, status) {
    super(message, status);
    this.name = "ApiException";
  }
};


export {
  ApiException,
  StorageException
};