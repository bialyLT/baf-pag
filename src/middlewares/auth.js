const { getUserId } = require('../services/userService');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('node:fs');

const key = fs.readFileSync('./keys/private.pem');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await getUserId(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      // si no existe el usuario y no hay error
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
}))

export const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false },
    (e, user, info) => {
      if (e) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      req.usr = user;
      next();
    })(req, res, next);
};