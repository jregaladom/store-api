const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');
// const UserService = require('../../../services/user.service');
// const service = new UserService();
const service = new AuthService();
// const boom = require('@hapi/boom');
// const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  service.getUser(email, password)
    .then(async user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

module.exports = LocalStrategy;
