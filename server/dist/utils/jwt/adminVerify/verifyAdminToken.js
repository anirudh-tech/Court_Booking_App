"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAdminToken = (req, res, next) => {
    try {
        const token = req.cookies.admin_jwt;
        jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (error, decoded) => {
            if (error) {
                throw new Error(error.message);
            }
            else {
                console.log(decoded, "----=====----");
                if (decoded.role == "admin") {
                    req.body._id = decoded._id;
                }
                else {
                    throw new Error("admin not verified");
                }
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.verifyAdminToken = verifyAdminToken;
