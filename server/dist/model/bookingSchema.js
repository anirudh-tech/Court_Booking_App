"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    sportId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Sport",
        required: true,
    },
    courtId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Court",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Booked", "RequestingCancel", "Cancelled", "Played", "Pending"],
        default: "Pending",
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
