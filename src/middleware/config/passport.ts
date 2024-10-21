import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';

// custom
import { Strategy as LocalStrategy } from 'passport-local';

// model
import User from '../../models/user';
import { checkHashEquality } from '../../utils/passHash';
import logger from '../../utils/helpers/errorLogger';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'da6a0bf3-ab77-42bd-954d-71f3314496c5',
  audience: 'nodejs-server',
};

// Strategy for auth based login
passport.use('local', new LocalStrategy({
  usernameField: 'username',
  session: false,
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) return done(null, false);

    // TODO: Hash pwd and check against user
    // if (!checkHashEquality(user.getDataValue('password'), user.getDataValue('salt'), password)) {
    //   return done(null, false);
    // }

    // Tmp
    if (password !== user.password) {
      return done(null, false);
    }

    // TODO: strip sensitive info from the user

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
}));

// Strategy for auth based on JWT
passport.use('jwt', new Strategy(opts, async (jwtPayload, done) => {
  try {
    const { aud } = jwtPayload;
console.log(jwtPayload);
    if (aud !== opts.audience) {
      return done(null, false, { message: 'Auth Failed.' });
    }

    // TODO: create a service for this
    const user = await User.findById(jwtPayload.user.id);

    if (!user) done(null, false, { message: 'User not found' });

    return done(null, user, { message: 'Loggin successfull' });
  } catch (e) {
    logger.log({
      level: 'error',
      message: e,
    });

    return done(null, false, { message: 'Error during auth!' });
  }
}));

export default passport;
