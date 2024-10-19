/* eslint-disable import/no-extraneous-dependencies */
// libs
import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import createServer from '../../src/server';

const app = createServer();

describe('User Controller', () => {
  test('get user by id from params', async () => {
    const userId = 1;

    const { body } = await supertest(app).get(`/api/user/${userId}`).expect(200);
    const { user, success } = body;

    expect(success).toBe(true);
    expect(user.id).toBe(userId);
  });
});
