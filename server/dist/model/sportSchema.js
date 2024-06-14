"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sport = void 0;
const mongoose_1 = require("mongoose");
const SportSchema = new mongoose_1.Schema({
    sportName: {
        type: String,
        required: true,
    },
    court: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Court",
        }]
}, {
    timestamps: true,
});
exports.Sport = (0, mongoose_1.model)("Sport", SportSchema);
