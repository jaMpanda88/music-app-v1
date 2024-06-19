const { ClientError, NotFoundError, InvariantError } = require('../exceptions/customErrors');

const errorHandler = (request, h) => {
  const { response } = request;

  if (response instanceof Error) {
    if (response instanceof ClientError) {
      return h
        .response({
          status: 'fail',
          message: response.message,
        })
        .code(response.statusCode);
    }

    if (response instanceof NotFoundError) {
      return h
        .response({
          status: 'fail',
          message: response.message,
        })
        .code(response.statusCode);
    }

    if (response instanceof InvariantError) {
      return h
        .response({
          status: 'fail',
          message: response.message,
        })
        .code(response.statusCode);
    }

    return h
      .response({
        status: 'error',
        message: 'Internal Server Error',
      })
      .code(500);
  }

  return h.continue;
};

module.exports = errorHandler;