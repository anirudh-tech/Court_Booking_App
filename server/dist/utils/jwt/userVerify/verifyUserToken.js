"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUserToken = (token) => ({
    return: jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (error, decoded) => {
        if (error) {
            throw new Error(error.message);
        }
        else {
            console.log(decoded, '----=====----');
            return decoded;
        }
    })
});
exports.verifyUserToken = verifyUserToken;
