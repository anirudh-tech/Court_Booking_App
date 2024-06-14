"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const sportController_1 = require("../controllers/sportController");
const courtController_1 = require("../controllers/courtController");
const bookingController_1 = require("../controllers/bookingController");
const routes = () => {
    const { adminLogin, userLogin } = (0, loginController_1.loginController)();
    const { addSport, editSport } = (0, sportController_1.sportController)();
    const { addCourt, editCourt } = (0, courtController_1.courtController)();
    const { bookCourt } = (0, bookingController_1.bookingController)();
    const router = (0, express_1.Router)();
    //admin routes
    // router.route("/add-admin").post(addAdmin)
    router.route("/admin-login").post(adminLogin);
    router.route("/user-login").post(userLogin);
    //sport routes
    router.route("/add-sport").post(addSport);
    router.route("/edit-sport").patch(editSport);
    //court routes
    router.route("/add-court").post(addCourt);
    router.route("/edit-court").patch(editCourt);
    //booking routes
    router.route("book-court").post(bookCourt);
    return router;
};
exports.routes = routes;
