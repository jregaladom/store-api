const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const service = new UserService();
const boom = require('@hapi/boom');

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    service.findByEmail(email)
        .then(user => {
            if (!user) {
                return done(boom.unauthorized(), false);
            }
            if (!service.validPassword(email, password)) {
                return done(boom.unauthorized(), false);
            }
            delete user.dataValues.password;
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
});

module.exports = LocalStrategy;