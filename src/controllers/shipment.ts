/** This is the shipment controller, should have the functionality to
 *
 * 1. Create new shipment
 * 2. Get all the shipments
 *
 * OPTIONAL
 * 3. Get details for a specific shipment
 */

import { Request, Response, NextFunction } from "express";
import Shipment from "../models/shipment";
import { ServerResponse } from "../helpers/server-response";
import { generateTrackingNumber } from "../helpers/helper-functions";

export const getShipments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {

  let response: ServerResponse;
  const userId = req.body.userId;

  try {
    const shipments = await Shipment.findAll({where: {'userId': userId}});
    if(shipments === null) {
      throw new Error("No shipments found");
    }
    response = {
      error: false,
      errorInfo: null,
      data: { shipments: shipments}
    }
  } catch(err: any) {
    console.log('Error when retrieving shipments')
    const errstatus = err.status ? err.status : 500;
    const errMessage = err.message && err.message !== '' ? err.message : 'Failed to revtrieve shipments';
    response = {
      error: true,
      errorInfo: {status: errstatus, message: errMessage},
      data: null
    }
  }
  res.send(response);
};

// OPTIONAL
export const getShipmentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let response: ServerResponse;
  const userId = req.body.userId;

  try {
    const shipments = await Shipment.findAll({where: {'userId': userId}});
    if(shipments === null) {
      throw new Error("No shipments found");
    }
    response = {
      error: false,
      errorInfo: null,
      data: { shipments: shipments}
    }
  } catch(err: any) {
    console.log('Error when retrieving shipments')
    const errstatus = err.status ? err.status : 500;
    const errMessage = err.message && err.message !== '' ? err.message : 'Failed to revtrieve shipments';
    response = {
      error: true,
      errorInfo: {status: errstatus, message: errMessage},
      data: null
    }
  }
  res.send(response);
};

export const createShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  
  // get shipment details
  const recipientName: string = req.body.recipientName;
  const recipientAddress: string = req.body.recipientAddress;
  const shipmentWeight: number = req.body.weight;
  const shipmentHeight: number = req.body.height;
  const shipmentLength: number = req.body.length;
  const shipmentWidth: number = req.body.width;
  const shipmentType: string = req.body.shipmentType;
  const deliveryType: string = req.body.deliveryType;

  const userId = req.body.userId;

  const shipmentDetails = {
    userId: userId,
    trackingNumber: generateTrackingNumber(20),
    recipientName: recipientName,
    recipientAddress: recipientAddress,
    weight: shipmentWeight,
    height: shipmentHeight,
    length: shipmentLength,
    width: shipmentWidth,
    shipmentType: shipmentType,
    deliveryType: deliveryType,
    shipmentStatus: 1,
    lastUpdated: new Date()
  }

  const shipment = await Shipment.create(shipmentDetails);
  console.log("shipment created: ", shipment);
  res.send("Create shipment route");
};

