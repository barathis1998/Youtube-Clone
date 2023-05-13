import mongoose from "mongoose";
import Feeling from "./feeling.js";

const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    description: {
      type: String,
      default: "",
    },
    thumbNailUrl: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "private", "public"],
      default: "draft",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

videoSchema.index({ title: "text" });

videoSchema.virtual("likes", {
  ref: "Feeling",
  localField: "_id",
  foreignField: "videoId",
  count: true,
  match: { type: "like" },
});

videoSchema.virtual("dislikes", {
  ref: "Feeling",
  localField: "_id",
  foreignField: "videoId",
  count: true,
  match: { type: "dislike" },
});

videoSchema.virtual("viewsCount", {
  ref: "Feeling",
  localField: "_id",
  foreignField: "videoId",
  count: true,
  match: { type: "views" },
});

videoSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "videoId",
  justOne: false,
  //count:true
});
const Video = mongoose.model("Video", videoSchema);

export default Video;
