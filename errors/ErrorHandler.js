const { SERVER_ERROR_MESSAGE } = require('./errors-const');

const errorHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .json({ message: statusCode === 500 ? SERVER_ERROR_MESSAGE : message });

  next();
});

module.exports = errorHandler;
