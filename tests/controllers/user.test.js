"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
// libs
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
const app = (0, server_1.default)();
(0, globals_1.describe)('User Controller', () => {
    (0, globals_1.test)('get user by id from params', async () => {
        const userId = 1;
        const { body } = await (0, supertest_1.default)(app).get(`/api/user/${userId}`).expect(200);
        const { user, success } = body;
        (0, globals_1.expect)(success).toBe(true);
        (0, globals_1.expect)(user.id).toBe(userId);
    });
});
