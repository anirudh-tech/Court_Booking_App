"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../model/userSchema");
// const adminUsername = "lalsportsacademy";
// const adminPassword = "d12Uc5OQ@47osOsiOD";
const loginController = () => {
    return {
        // addAdmin: async (req: Request, res: Response, next: NextFunction) => {
        //   let { username, password, role } = req.body;
        //   req.body.password = await hash(password, await genSalt(10));
        //   const admin = await User.create(req.body)
        //   res.json({
        //     data: admin,
        //     message: "admin added"
        //   })
        // },
        adminLogin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const admin = yield userSchema_1.User.findOne({ username });
                if (admin) {
                    console.log("🚀 ~ file: loginController.ts:17 ~ adminLogin: ~ admin:", admin);
                    const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
                    if (!isMatch) {
                        throw new Error("Username or password incorrect");
                    }
                    else {
                        let payload = {
                            _id: String(admin === null || admin === void 0 ? void 0 : admin._id),
                            username: admin === null || admin === void 0 ? void 0 : admin.username,
                            role: "admin",
                        };
                        const accessToken = jsonwebtoken_1.default.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: "1h" });
                        res.cookie("admin_jwt", accessToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                        });
                        const adminObject = admin.toObject();
                        delete adminObject.password;
                        res.json({
                            success: true,
                            data: adminObject,
                            message: "Admin verified!",
                        });
                    }
                }
                else {
                    throw new Error("Account not found");
                }
            }
            catch (error) {
                next(error);
            }
        }),
        userLogin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const { phoneNumber } = req.body;
                const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            }
            catch (error) {
            }
        })
    };
};
exports.loginController = loginController;
