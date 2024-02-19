const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_JWT_SECRET;
const payload = {
  sub: '1234',
  role: 'admin'
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
