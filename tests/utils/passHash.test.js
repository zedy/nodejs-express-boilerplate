"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
// libs
const globals_1 = require("@jest/globals");
const crypto_1 = __importDefault(require("crypto"));
// files
const passHash_1 = require("../../src/utils/passHash");
// min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
const password = process.env.DEFAULT_USER_PASSWORD;
(0, globals_1.test)('generate password:using no salt', () => {
    const result = (0, passHash_1.hashString)(password);
    const { salt, hash } = result;
    (0, globals_1.expect)(result).toHaveProperty('salt');
    (0, globals_1.expect)(result).toHaveProperty('hash');
    (0, globals_1.expect)(salt).toMatch(/^[a-f0-9]{32}$/);
    (0, globals_1.expect)(hash).toMatch(/^[a-f0-9]{128}$/);
});
(0, globals_1.test)('generate password:salt provided', () => {
    const customSalt = crypto_1.default.randomBytes(16).toString('hex');
    const result = (0, passHash_1.hashString)(password, customSalt);
    const { salt } = result;
    (0, globals_1.expect)(salt).toBe(customSalt);
});
(0, globals_1.test)('check if password is being hashed', () => {
    const salt = 'a97cc7c68367e6d1aac8d3d42d1bc8e6';
    const hash = '31fbf4a9586fad2c34265b1f1f937691afa1074de570fac94d6aa42c2865e5d1ab0ab19812625b765f1d68a8b390e1b4ce1d772af4563408a2907868897cde83';
    (0, globals_1.expect)((0, passHash_1.checkHashEquality)(hash, salt, password)).toBe(true);
});
