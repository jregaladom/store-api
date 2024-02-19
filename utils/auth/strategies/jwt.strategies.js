const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { config } = require('../../../config/config');


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.AUTH_JWT_SECRET
}


const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    if (payload) {
      return done(null, payload);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = jwtStrategy;
