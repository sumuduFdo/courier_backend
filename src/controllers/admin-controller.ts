import { Request, Response, NextFunction } from "express";

import Shipment from "../models/shipment";
import User from "../models/user";

import HttpResponse from "../models/http-response";
import HttpError from "../models/http-error";

export const updateShipmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.body.shipmentId;
  const newStatus: string = req.body.shipmentStatus;
  let response: HttpResponse;
  let shipment;
  let saveResult;

  try {
    shipment = await Shipment.findByPk(id);
  } catch(err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, 'Failed to update shipment status');
    return next(error);
  }

  if(!shipment) {
    const error = new HttpError(500, 'Failed to update shipment status');
    return next(error);
  } else {
    shipment.shipmentStatus = newStatus;
    try {
      saveResult = await shipment.save(); 
    } catch(err) {
      console.log(`[ERROR] ${err}`);
      const error = new HttpError(500, 'Failed to update shipment status');
      return next(error);
    }
  }
  
  response = {error: null, data: {shipmentId: shipment?.id, shipmentStatus: newStatus}}
  res.json(response);
};

// OPTIONAL
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;
  let response: HttpResponse;
  let user;
  let deleteResult;

  try {
    user = await User.findByPk(userId);
  } catch(err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, 'User not found');
    return next(error);
  }

  try {
    deleteResult = await user?.destroy();
  } catch(err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, 'Failed to delete user');
    return next(error);
  }

  response = {error: null, data: {userId: userId}}
  res.json(response);
};

