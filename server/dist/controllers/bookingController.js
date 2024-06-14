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
exports.bookingController = void 0;
const sportSchema_1 = require("../model/sportSchema");
const courtSchema_1 = require("../model/courtSchema");
const bookingSchema_1 = require("../model/bookingSchema");
const razorpay_1 = __importDefault(require("razorpay"));
const userSchema_1 = require("../model/userSchema");
const bookingController = () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET;
    if (!keyId || !keySecret) {
        throw new Error("Razorpay key ID or secret is not defined in environment variables");
    }
    const razorpay = new razorpay_1.default({
        key_id: keyId,
        key_secret: keySecret,
    });
    return {
        bookCourt: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { sportId, courtId, date, time, userId, duration, amount } = req.body;
                const sport = yield sportSchema_1.Sport.findById(sportId);
                if (!sport) {
                    return res.status(404).json({
                        status: false,
                        message: "Sport not found",
                    });
                }
                const court = yield courtSchema_1.Court.findById(courtId);
                if (!court) {
                    return res.status(404).json({
                        status: false,
                        message: "Court not found",
                    });
                }
                const user = yield userSchema_1.User.findById(userId);
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: "User not found",
                    });
                }
                const booking = yield bookingSchema_1.Booking.create({
                    sportId,
                    courtId,
                    date,
                    time,
                    userId,
                    duration,
                    amount,
                });
                const options = {
                    amount: amount,
                    currency: "INR",
                    receipt: booking._id,
                };
                const order = yield razorpay.orders.create(options);
                return res.json({
                    status: true,
                    data: booking,
                    message: "Booking added",
                });
            }
            catch (error) {
                next(error);
            }
        }),
    };
};
exports.bookingController = bookingController;
