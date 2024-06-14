"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Court = void 0;
const mongoose_1 = require("mongoose");
const CourtSchema = new mongoose_1.Schema({
    courtName: {
        type: String,
        required: true,
    },
    cost: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Money"
    }
}, {
    timestamps: true,
});
exports.Court = (0, mongoose_1.model)("Court", CourtSchema);
