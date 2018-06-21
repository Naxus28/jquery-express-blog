class Exception {
  constructor(message, status) {
    this.message = message;
    this.status = status;
    this.name = "Exception";
  }
};

class DatabaseException extends Exception {
  constructor(message, status) {
    super(message, status);
    this.name = "DatabaseException";
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
  DatabaseException
};