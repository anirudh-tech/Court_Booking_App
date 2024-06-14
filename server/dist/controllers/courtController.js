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
exports.courtController = void 0;
const sportSchema_1 = require("../model/sportSchema");
const moneySchema_1 = require("../model/moneySchema");
const courtSchema_1 = require("../model/courtSchema");
const courtController = () => {
    return {
        addCourt: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { sportId, courtName, weekDays, weekEnds, extra } = req.body;
                const cost = yield moneySchema_1.Money.create({
                    weekDays,
                    weekEnds,
                    extra,
                });
                const court = yield courtSchema_1.Court.create({
                    courtName,
                    cost: cost._id,
                });
                const sport = yield sportSchema_1.Sport.findByIdAndUpdate(sportId, {
                    $push: {
                        court: court._id,
                    },
                }, { new: true });
                return res.json({
                    status: true,
                    data: court,
                    message: "Court added",
                });
            }
            catch (error) {
                next(error);
            }
        }),
        editCourt: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { courtId, courtName, weekDays, weekEnds, extra } = req.body;
                const court = yield courtSchema_1.Court.findById(courtId);
                if (!court) {
                    return res.status(404).json({
                        status: false,
                        message: "Court not found",
                    });
                }
                if (courtName) {
                    court.courtName = courtName;
                }
                if (weekDays || weekEnds || extra) {
                    const cost = yield moneySchema_1.Money.findById(court.cost);
                    if (!cost) {
                        return res.status(404).json({
                            status: false,
                            message: "Cost details not found",
                        });
                    }
                    if (weekDays)
                        cost.weekDays = weekDays;
                    if (weekEnds)
                        cost.weekEnds = weekEnds;
                    if (extra)
                        cost.extra = extra;
                    yield cost.save();
                }
                yield court.save();
                return res.json({
                    status: true,
                    data: court,
                    message: "Court updated",
                });
            }
            catch (error) {
                next(error);
            }
        }),
    };
};
exports.courtController = courtController;
