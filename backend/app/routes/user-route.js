import express from "express";
import * as userController from "./../controllers/user-controller.js";

const router = express.Router();
router.route("/").post(userController.post);

router.route("/:email").get(userController.getUserBasedOnEmail);
router.route("/login").post(userController.validateUser);
router.route("/verifyEmailToken").post(userController.verifyEmail);

export default router;
