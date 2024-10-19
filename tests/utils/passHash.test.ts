/* eslint-disable max-len */
// libs
import { expect, test } from '@jest/globals';
import crypto from 'crypto';

// files
import { hashString, checkHashEquality } from '../../src/utils/passHash';

// min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
const password = process.env.DEFAULT_USER_PASSWORD;

test('generate password:using no salt', () => {
  const result = hashString(password);
  const { salt, hash } = result;

  expect(result).toHaveProperty('salt');
  expect(result).toHaveProperty('hash');
  expect(salt).toMatch(/^[a-f0-9]{32}$/);
  expect(hash).toMatch(/^[a-f0-9]{128}$/);
});

test('generate password:salt provided', () => {
  const customSalt = crypto.randomBytes(16).toString('hex');
  const result = hashString(password, customSalt);
  const { salt } = result;

  expect(salt).toBe(customSalt);
});

test('check if password is being hashed', () => {
  const salt = 'a97cc7c68367e6d1aac8d3d42d1bc8e6';
  const hash = '31fbf4a9586fad2c34265b1f1f937691afa1074de570fac94d6aa42c2865e5d1ab0ab19812625b765f1d68a8b390e1b4ce1d772af4563408a2907868897cde83';

  expect(checkHashEquality(hash, salt, password)).toBe(true);
});
