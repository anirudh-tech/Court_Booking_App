"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
const mongoose_1 = require("mongoose");
const MoneySchema = new mongoose_1.Schema({
    weekDays: {
        type: Number,
        required: true,
    },
    weekEnds: {
        type: Number,
        required: true,
    },
    extra: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});
exports.Money = (0, mongoose_1.model)("Money", MoneySchema);
