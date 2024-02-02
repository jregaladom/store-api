const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKeyHandler(req, res, next) {
  const apiKey = req.headers['api-key'];
  if (apiKey === config.API_KEY) {
    next();
  } else {
    next(boom.unauthorized());
  }
}


module.exports = { checkApiKeyHandler };
