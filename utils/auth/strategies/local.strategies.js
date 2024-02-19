const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  service.findByEmail(email)
    .then(async user => {
      if (!user) {
        return done(boom.unauthorized(), false);
      }

      const isPassword = await bcrypt.compare(password, user.password);

      if (!isPassword) {
        return done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

module.exports = LocalStrategy;
