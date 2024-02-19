const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_JWT_SECRET;
const token = '';

function virifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = virifyToken(token, secret);
console.log(payload);
