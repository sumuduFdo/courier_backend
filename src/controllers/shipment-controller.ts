import { Request, Response, NextFunction } from "express";
import Shipment from "../models/shipment";
import crypto from "crypto";
import HttpError from "../models/http-error";
import HttpResponse from "../models/http-response";

/** GET all shipments from the Database */
export const getShipments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.userId;
  let response: HttpResponse;
  let shipments;

  try {
    shipments = await Shipment.findAll({ where: { userId: userId } });
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, "Failed to retrieve shipments");
    return next(error);
  }

  response = { error: null, data: shipments };
  res.status(200).json(response);
};

export const getShipmentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let response: HttpResponse;
  let shipment;
  const shipmentId = req.params.shipmentId; // retireve shipmentId from route parameters

  try {
    shipment = await Shipment.findByPk(shipmentId);
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, "Failed to retrieve shipments details");
    return next(error);
  }

  if (!shipment) {
    const error = new HttpError(500, "Failed to retrieve shipments details");
    return next(error);
  }

  response = { error: null, data: shipment };
  res.status(200).json(response);
};

/* create and insert new shipment in DB */
export const createShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let shipmentCreateResult;
  let response: HttpResponse;
  let trackingNumber = "";

  // get shipment details
  const recipientName: string = req.body.recipientName;
  const recipientAddress: string = req.body.recipientAddress;
  const shipmentWeight: number = req.body.weight;
  const shipmentType: string = req.body.shipmentType;
  const deliveryType: string = req.body.deliveryType;

  const userId = req.body.userId;

  /** generate tracking number for shipment 
      generates a custom string consisting of uppercase letters and numbers
  */
  try {
    trackingNumber = crypto
      .randomBytes(20)
      .toString("hex")
      .slice(0, 20)
      .toUpperCase();
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(
      500,
      "Internal server error. Failed to create new shipment"
    );
    return next(error);
  }

  // insert new record to DB and handle any errors
  try {
    shipmentCreateResult = await Shipment.create({
      userId: userId,
      trackingNumber: trackingNumber,
      recipientName: recipientName,
      recipientAddress: recipientAddress,
      weight: shipmentWeight,
      shipmentType: shipmentType,
      deliveryType: deliveryType,
      shipmentStatus: "Order Placed",
      lastUpdated: new Date(),
    });
  } catch (err) {
    console.log(`[ERROR] ${err}`);
    const error = new HttpError(500, "Failed to create shipment");
    return next(error);
  }

  response = { error: null, data: { shipmentId: shipmentCreateResult?.id } };
  res.status(201).json(response);
};
