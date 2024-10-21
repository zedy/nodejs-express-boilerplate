"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
// libs
const globals_1 = require("@jest/globals");
// files
const jwt_1 = require("../../src/utils/jwt");
const userPayload = {
    id: 1,
    email: 'test@email.com',
    role: 'admin',
};
const beaererToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcwNzUwODMyMCwiZXhwIjoxNzA3NTUxNTIwfQ.wOiCEGS-JO5w5Q0DfgPM5ObEuuBrDOAi6VQeh16nlrA';
(0, globals_1.test)('jwt will be generated', () => {
    const token = (0, jwt_1.getToken)(userPayload);
    (0, globals_1.expect)(token).toMatch(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
});
(0, globals_1.test)('jwt to be decoded and tested against userPayload', () => {
    const token = (0, jwt_1.readToken)(beaererToken);
    const { user } = token;
    (0, globals_1.expect)(user).toMatchObject(userPayload);
});
