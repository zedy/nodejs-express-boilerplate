// libs
import * as jwt from 'jsonwebtoken';

// interface
import { UserBasic } from '../types/User';

const secret = process.env.JWT_SECRET || 'da6a0bf3-ab77-42bd-954d-71f3314496c5';

const payload = {
  aud: 'nodejs-server',
  iat: Math.floor(Date.now() / 1000),
};

export const getToken = (userPayload: UserBasic) => {
  const token = jwt.sign({ user: userPayload, ...payload }, secret, {
    expiresIn: '12h',
  });

  return token;
};

export const readToken = (token: string) => {
  const decoded = jwt.decode(token);

  return decoded;
};
