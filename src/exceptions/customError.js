class ClientError extends Error {
    constructor(message, statusCode = 400) {
      super(message);
      this.name = 'ClientError';
      this.statusCode = statusCode;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
}
  
  class NotFoundError extends ClientError {
    constructor(message = 'Resource not found') {
      super(message, 404);
      this.name = 'NotFoundError';
    }
}
  
  class InvariantError extends ClientError {
    constructor(message = 'Invariant error') {
      super(message, 400);
      this.name = 'InvariantError';
    }
}
  
module.exports = { ClientError, NotFoundError, InvariantError };