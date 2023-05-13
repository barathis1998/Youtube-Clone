import {
  getUserByIdAndUpdate,
  save,
  validateLogin,
  getUser,
} from "./../services/user-service.js";
import User from "../models/user.js";
import responses from "../utils/responses.js";
import sendEmail from "../utils/email.js";
import jwt from "jsonwebtoken";

export const post = async (request, response) => {
  try {
    // console.log("inside post");
    const newUser = request.body;
    const saveUser = await save(newUser);

    const token = saveUser.getSignedJwtToken();
    console.log(token);
    sendEmail(saveUser.email, token, saveUser.lastName, saveUser._id);
    setSuccessfulresponse(saveUser, response);
    console.log("Email sent to:", saveUser.email);
  } catch (err) {
    response.json({
      err,
    });
  }

  // if(saveUser) {
  //   response.render('registration',{message:"registration done"})
  // }
};

export const validateUser = async (request, response) => {
  // console.log("inside validate user");
  try {
    const userDetails = request.body;
    const checkUser = await validateLogin(userDetails);
    console.log("checkUser " + checkUser);

    if (checkUser) {
      // setSuccessfulresponse(checkUser, response);
      const token = checkUser.getSignedJwtToken();
      console.log("inside");
      sendTokenResponse(token, 200, response);
      // setSuccessfulresponse(checkUser, response);
    } else if (!checkUser) {
      response.status(404);
      response.json(checkUser);
    }
  } catch (err) {
    response.status(500);
    response.json(err);
  }
};

const setSuccessfulresponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const sendTokenResponse = (token, statusCode, res) => {
  console.log("inside send token");
  //console.log(user);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // if (process.env.NODE_ENV === 'production') {
  //   options.secure = true
  // }
  console.log("send token");
  // res
  //   .status(statusCode)
  //   .cookie('token', token, options)
  //   .json({ success: true, token })

  responses.setSuccessfulResponse(
    { message: "successful", data: token },
    res,
    200
  );
};

export const getUserBasedOnEmail = async (request, response) => {
  try {
    console.log("inside getUser in controller");
    const email = request.params.email;
    console.log("email " + email);
    const userProfile = await getUser(email);
    setSuccessfulresponse(userProfile, response);
  } catch (err) {
    response.status(404);
    response.json({ err });
  }
};

export const verifyEmail = (req, res, next) => {
  console.log(
    "-------------------inside verify email ------------------------"
  );
  const { id, token } = req.body;
  const decode = jwt.verify(token, "mysecretkey");
  console.log(decode);
  const updatedUser = getUserByIdAndUpdate(id);
  responses.setSuccessfulResponse(
    { message: "user verified", data: updatedUser },
    res,
    200
  );
};
