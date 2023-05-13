import mongoose, { Schema } from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
