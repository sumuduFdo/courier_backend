/** This is the shipment controller, should have the functionality to
 *
 * 1. Create new shipment
 * 2. Get all the shipments
 *
 * OPTIONAL
 * 3. Modify shipment information (only seleted)
 * 4. Get details for a specific shipment
 */

import { Request, Response, NextFunction } from "express";

export const createShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  res.send("Create shipment route");
};
export const getShipments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  res.send("Get all shipments route");
};

// OPTIONAL
export const getShipmentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  res.send("Get shipment details route");
};
export const updateShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  res.send("Update shipment route");
};
