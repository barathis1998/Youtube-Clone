import express from "express";
import { protect } from "../../middleware/auth.js";
import { createFeeling } from "../controllers/feeling-controller.js";
import { getLikedVideo } from "../controllers/feeling-controller.js";


const router = express.Router();

router.route('/').post(protect,createFeeling);
router.route('/videos').get(protect,getLikedVideo);

export default router;