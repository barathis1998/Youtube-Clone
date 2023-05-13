import {
  deleteComment,
  getComments,
  postComments,
  updateComment,
} from "../services/comment-service.js";

export const post = async (request, response) => {
  try {
    console.log("inside post of comment controller");
    const newComment = request.body;
    const saveComment = await postComments(newComment);
    setSuccessfulresponse(saveComment, response);
  } catch (err) {
    response.json({
      err,
    });
  }
};

export const fetch = async (request, response) => {
  try {
    const params = {};
    const getComment = await getComments(params);
    if (getComment) {
      setSuccessfulresponse(getComment, response);
    } else if (!getComment) {
      response.status(404);
      response.json({ message: "comment to update not found" });
    }
  } catch (err) {
    response.status(500);
  }
};

export const removeComment = async (request, response) => {
  try {
    const id = request.params.id;
    console.log("id to delete " + id);
    const comment = await deleteComment(id);
    setSuccessfulresponse(comment, response);
  } catch (err) {
    response.status(404);
    response.json({
      err: {
        message: err.message,
      },
    });
  }
};

export const updateCmnt = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedComment = request.body;
    const comment = await updateComment(id, updatedComment);
    if (comment !== null) {
      setSuccessfulresponse(comment, response);
    } else {
      response.status(404);
      response.josn({ message: "comment not found to update" });
    }
  } catch (err) {
    response.status(404);
    response.json({ error: "comment not found" });
  }
};

const setSuccessfulresponse = (data, response) => {
  response.status(200);
  response.json({ message: "successful", data });
};
