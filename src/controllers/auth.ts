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

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  const houseNo: number = req.body.houseNo;
  const streetAddr = req.body.streetAddress;
  const city = req.body.city;
  const zipcode = req.body.zipcode;
  const userType = req.body.userType;

  this

  res.send("User register route");
};
export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("User login route");
};

// OPTIONAL
// ONLY ADMIN FUNCTIONALITY
