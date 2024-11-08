import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import HttpError from "../models/http-error";
import HttpResponse from "../models/http-response";

/** Create new user and insert in DB */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const dateOfBirth: Date = getDateOfBirth(1999, 4, 3);
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  const houseNumber: string = req.body.houseNumber;
  const streetAddr: string = req.body.streetAddress;
  const city: string = req.body.city;
  const zipcode: string = req.body.zipcode;
  const password: string = req.body.password;

  let response: HttpResponse;
  let passwordHash: string = "";
  let newUser;
  let token: string = "";

  // throw error in case values are missing
  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !email ||
    !phone ||
    !houseNumber ||
    !streetAddr ||
    !city ||
    !zipcode
  ) {
    const error = new HttpError(
      500,
      "Invalid user input. Please re-check your inputs."
    );
    return next(error);
  }

  /** generate password hash for security using a salt value
   *  this password hash (which is a string) is stored in the DB insted
   *  of the actual password
   */
  try {
    const salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(password, salt);
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, "Failed to register new user");
    return next(error);
  }

  try {
    newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      phone: phone,
      houseNo: houseNumber,
      streetAddress: streetAddr,
      city: city,
      zipCode: zipcode,
      password: passwordHash,
      isAdmin: false,
      createdAt: new Date(),
    });
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, "Server error. User registration failed.");
    return next(error);
  }

  // genereate jwt token for successful user
  try {
    const userId = newUser?.userId;
    token = jwt.sign(
      { userId: newUser?.userId, email: newUser?.email },
      "baby-shark-doo-doo-doo-doo",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, "User registration failed");
    return next(error);
  }

  response = {
    error: null,
    data: { userId: newUser?.userId, token: token, isAdmin: newUser?.isAdmin },
  };
  res.status(201).json(response);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.body.userName;
  const passwd = req.body.password;

  let user;
  let response: HttpResponse;
  let validUser;
  let token;

  if (!userName || !passwd) {
    const error = new HttpError(
      500,
      "Invalid username or password. Please re-check your inputs."
    );
    return next(error);
  }

  /** Query DB to find the user with email -> unique due to Unique constraint */
  try {
    user = await User.findOne({
      where: { email: userName },
      attributes: ["userId", "password", "isAdmin"],
    });
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(
      404,
      "Login attempt failed. Please try again later."
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      404,
      "User not found. Please register new user."
    );
    return next(error);
  }

  /** validate user password with the compare() method*/
  try {
    const userId = user?.userId;
    const adminStatus = user?.isAdmin;
    validUser = await bcrypt.compare(passwd, user?.password);
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(
      500,
      "User authorization failed. Please try again later"
    );
    return next(error);
  }

  if (!validUser) {
    const error = new HttpError(401, "Incorrect password");
    return next(error);
  }

  // genereate password token for successful user
  try {
    const userId = user?.userId;
    token = jwt.sign(
      { userId: user?.userId, email: user?.email, isAdmin: user?.isAdmin },
      "baby-shark-doo-doo-doo-doo",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, "User registration failed");
    return next(error);
  }

  res
    .status(200)
    .json({
      error: null,
      data: { userId: user?.userId, token: token, isAdmin: user?.isAdmin },
    });
};

const getDateOfBirth = function (
  year: number,
  month: number,
  day: number
): Date {
  return new Date(year, month, day);
};
