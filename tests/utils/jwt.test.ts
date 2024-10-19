/* eslint-disable max-len */
// libs
import { expect, test } from '@jest/globals';

// files
import { getToken, readToken } from '../../src/utils/jwt';

const userPayload = {
  id: 1,
  email: 'test@email.com',
  role: 'admin',
};

const beaererToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcwNzUwODMyMCwiZXhwIjoxNzA3NTUxNTIwfQ.wOiCEGS-JO5w5Q0DfgPM5ObEuuBrDOAi6VQeh16nlrA';

test('jwt will be generated', () => {
  const token = getToken(userPayload);

  expect(token).toMatch(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
});

test('jwt to be decoded and tested against userPayload', () => {
  const token = readToken(beaererToken);
  const { user } = token;

  expect(user).toMatchObject(userPayload);
});
