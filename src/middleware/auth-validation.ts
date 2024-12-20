import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";

declare module "express-serve-static-core" {
  export interface Request {
    userId: string;
    isAdmin: boolean;
  }
}

/** middleware function for user validation.
 *  validates the jwt token sent form client
 */
export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // In the format 'Bearer TOKEN_VALUE'
    if (!token) {
      throw new Error("Authentication failed.");
    }

    /* verify jwt token */
    const verifiedToken = jwt.verify(
      token,
      "baby-shark-doo-doo-doo-doo"
    ) as JwtPayload;
    if (!verifiedToken) {
      throw new Error("Authentication failed.");
    } else {
      req.userId = verifiedToken.userId;
      req.isAdmin = verifiedToken.isAdmin;
    }
    next();
  } catch (err) {
    const error = new HttpError(401, "Authorization failed.");
    return next(error);
  }
};

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAdmin = req.isAdmin;
    if(!isAdmin) {
      throw new Error("User is not Authroized to perform this operation.");
    }
    next();
  } catch (err: any) {
    let error;
    if(err.message) {
      error = new HttpError(401, err.message);
    } else {
      error = new HttpError(500, "User authorization failed. Please try again later.ƒ");
    }
    return next(error);
  }
};