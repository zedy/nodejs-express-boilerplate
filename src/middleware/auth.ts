/* eslint-disable consistent-return */
import passport from 'passport';
import { getToken } from '../utils/jwt';

import 'dotenv/config';

export const loginMiddleware = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Username or password are incorrect' });

    req.login(
      user,
      { session: false },
      async (error) => {
        if (error) return next(error);

        const token = getToken({
          email: user.email,
          id: user.id,
          role: user.role,
        });

        res.locals.token = token;
        res.locals.user = user;
      },
    );

    next();
  })(req, res, next);
};

export const jwtMiddleware = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Unauthorized Access - No Token Provided!' });
    req.user = user;
    next();
  })(req, res, next);
};
