import Comment from "./../models/comments.js";

export const getComments = async (params) => {
  const comment = Comment.find(params).exec();
  return comment;
};

export const postComments = async (newComment) => {
  const comment = new Comment(newComment);
  console.log("comment from api " + comment);
  return comment.save();
};

export const updateComment = async (id, updatedComment) => {
  const comment = Comment.findByIdAndUpdate(id, {
    commentText: updatedComment.commentText,
  }).exec();
  return comment;
};

export const deleteComment = async (id) => {
  const comment = Comment.findByIdAndDelete(id).exec();
  console.log("comment to delete " + comment);
  return comment;
};
