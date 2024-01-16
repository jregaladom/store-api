const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}


function boomErrorHandler(err, req, res, next) {
  console.log('boomErrorHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}


function errorHandler(err, req, res) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log(err);
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      detail: err.parent.detail,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
