import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { verifyAdminToken } from "../utils/jwt/adminVerify/verifyAdminToken";
import { sportController } from "../controllers/sportController";
import { courtController } from "../controllers/courtController";
import { bookingController } from "../controllers/bookingController";

export const routes = () => {
  const { adminLogin } = loginController();
  const { addSport, editSport } = sportController();
  const { addCourt, editCourt } = courtController();
  const {} = bookingController();
  const router = Router();

  //admin routes
  router.route("/admin-login").post(adminLogin);

  //sport routes
  router.route("/add-sport").post(addSport);
  router.route("/edit-sport").patch(editSport);

  //court routes
  router.route("/add-court").post(addCourt);
  router.route("/edit-court").patch(editCourt);

  //booking routes
  router.route("book-court").post()

  return router;
};
