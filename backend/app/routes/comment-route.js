import express from "express";
import * as commentController from "./../controllers/comment-controller.js";

const router = express.Router();
router.route("/").post(commentController.post).get(commentController.fetch);
router
  .route("/:id")
  .delete(commentController.removeComment)
  .put(commentController.updateCmnt);

export default router;
