/**
 * This is the auth controller, should include the functionality to:
 *
 * 1. Login
 * 2. Register
 *
 * OPTIONAL
 * 1. Change user name
 * 2. Change password
 */

import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { ServerResponse } from "../helpers/server-response";
import { handleError } from "../helpers/helper-functions";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const dateOfBirth: Date = getDateOfBirth(1999, 4, 3);
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  const houseNo: string = req.body.houseNo;
  const streetAddr: string = req.body.streetAddress;
  const city: string = req.body.city;
  const zipCode: string = req.body.zipCode;
  const isAdmin: boolean = req.body.userType;
  const password: string = req.body.password;

  let response: ServerResponse;
  let passwrodHash: string = "";
  try {
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !phone ||
      !houseNo ||
      !streetAddr ||
      !city ||
      !zipCode ||
      !isAdmin
    ) {
      throw new Error('Invalid user information. Please re-check your inputs');
    }
    const passwrodHash: string = await generatePasswordHash(password);
  } catch (err) {
    const error = { status: 500, message: "Internal Server Error" };
    response = handleError(error, "Internal Server Error");
  }

  try {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      phone: phone,
      houseNo: houseNo,
      streetAddress: streetAddr,
      city: city,
      zipCode: zipCode,
      password: passwrodHash,
      isAdmin: isAdmin,
      createdAt: new Date(),
    };
    const user = await User.create(userData);
    const userId = user.userId;

    // update response details
    response = {
      error: false,
      errorInfo: null,
      data: { userId: userId },
    };
  } catch (err) {
    console.log("Error when creating user: ", err);
    response = handleError(err, "Failed to register");
  }

  res.send(response);
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.body.userName;
  const passwd = req.body.password;

  let response: ServerResponse;
  try {
    if (!userName || !passwd) {
      throw new Error("Invalid usernme or password");
    }
    const user = await User.findOne({
      where: { email: userName },
      attributes: ["userId", "password", "isAdmin"],
    });
    if (!user) {
      throw new Error("User not found");
    }
    const userId = user.userId;
    const adminStatus = user.isAdmin;
    const passwordResult = await comparePasswords(passwd, user.password);
    if (passwordResult === false) {
      throw new Error("Authentication failed");
    }

    response = {
      error: false,
      errorInfo: { status: null, message: null },
      data: { userId: userId, adminStatus: adminStatus },
    };
  } catch (err) {
    console.log("Error when user authenticate: ", err);
    response = handleError(err, "User authentication error");
  }

  res.send(response);
};

const getDateOfBirth = function (
  year: number,
  month: number,
  day: number
): Date {
  return new Date(year, month, day);
};

/** Specific functions for user authentication and authorization
 *  (therefore not moved to helper-functions)
 */
const generatePasswordHash = async function (passwd: string): Promise<string> {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwd, salt);
    return Promise.resolve(hash);
  } catch (err) {
    console.log("Error when hashing password");
    const error = new Error("Failed to generate password hash");
    return Promise.reject(error);
  }
};

const comparePasswords = async function (
  userPasswd: string,
  retrieved: string
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(userPasswd, retrieved);
    return Promise.resolve(result);
  } catch (err) {
    console.log("[ERROR] Error when comparing passwords");
    return Promise.reject(new Error("Compare passwords failed"));
  }
};
