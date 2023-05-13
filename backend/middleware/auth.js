import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/async.js'
import responses from '../app/utils/responses.js'
import User from '../app/models/user.js'
import { response } from 'express'

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }


  if (!token) {
    // return next(new ErrorResponse('Not authorized to access this route', 401))
    responses.setErrorResponse({message:'not authorized to access No Token'},res,401);
    return;
  }
  //console.log(token);
  try {
    // Verify token
    console.log("Inside auth");
    console.log(token);
    const decoded = jwt.verify(token,'mysecretkey');
    console.log("Decoded id:"+decoded);
    req.user = await User.findById(decoded.id);
    console.log("Authorization"+req.user);
    //responses.setSuccessfulResponse({Message:`User Authorized ${req.user.firstName}`},res,200);
    next();
  } catch (err) {
    // return next(new ErrorResponse('Not authorized to access this route', 401))
    console.log(err);
    responses.setErrorResponse({message:'not authorized to access hi',data:err},res,401);
    return;
  }
})

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}
