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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sportController = void 0;
const sportSchema_1 = require("../model/sportSchema");
const sportController = () => {
    return {
        addSport: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { sportName } = req.body;
                const sport = yield sportSchema_1.Sport.create({ sportName });
                return res.json({
                    status: true,
                    data: sport,
                    message: "Sport added",
                });
            }
            catch (error) {
                next(error);
            }
        }),
        editSport: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { sportId, sportName } = req.body;
                const sport = yield sportSchema_1.Sport.findByIdAndUpdate(sportId, { sportName }, { new: true });
                if (!sport) {
                    return res.status(404).json({
                        status: false,
                        message: "Sport not found",
                    });
                }
                return res.json({
                    status: true,
                    data: sport,
                    message: "Sport updated",
                });
            }
            catch (error) {
                next(error);
            }
        }),
    };
};
exports.sportController = sportController;
