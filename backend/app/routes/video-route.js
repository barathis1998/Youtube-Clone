import express from "express";
import * as videoController from "./../controllers/video-controller.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { protect } from "../../middleware/auth.js";
import advancedResults from "../../middleware/advancedResults.js";
import Video from "../models/videos.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4" && ext !==".img" && ext !==".png" && ext !==".jpeg" && ext!==".jpg") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});

const router = express.Router();
router.route('/')
    .get(advancedResults( Video,
      [
        { path: 'userId' },
        { path: 'likes' },
        { path: 'dislikes' }
      ]),videoController.getVideos)
    .post(upload.single("video"),protect, videoController.videoUpload)
    
;
    router.route('/videoByUser')
      .get(protect,videoController.getVideoByUser)
router.route('/:id')
    .get(videoController.getVideo)
    .delete(videoController.deleteVideo);

router.route('/:id/views')
    .put(videoController.updateViews);

router.route('/:id/thumbnail')
      .put(upload.single("image"),videoController.uploadThumbnail);



export default router;
