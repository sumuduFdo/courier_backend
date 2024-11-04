/** this is the admin controller, should contain functionality for
 *
 * 1. Changing shipment status
 *
 * NO SHIPMENT CREATION FUNCTIONALITY
 * OPTIONAL
 * 1. Delete existing users
 */

import { Request, Response, NextFunction } from "express";
import Shipment from "../models/shipment";
import ShipmentStatus from "../models/shipment-status";
import User from "../models/user";
import { ServerResponse } from "../helpers/server-response";
import { handleError } from "../helpers/helper-functions";

export const getShipmentStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: ServerResponse;
  try {
    const possibleStatus = await ShipmentStatus.findAll();
    if (!possibleStatus || possibleStatus.length === 0) {
      throw new Error("Falied to retrieve shipment status");
    }
    response = {
      error: false,
      errorInfo: null,
      data: { serverStatus: possibleStatus },
    };
  } catch (err) {
    console.log("[ERROR] Failed to retrieve possible shipment status");
    response = handleError(
      err,
      "Failed to retrieve shipment status from database"
    );
  }
};

export const updateShipmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.body.shipmentId;
  const newStatus: number = req.body.shipmentStatus;

  let response: ServerResponse;

  try {
    const shipment = await Shipment.findByPk(id);
    if (!shipment) {
      throw new Error("Shipment not found");
    }
    shipment.shipmentStatus = newStatus;
    const result = await shipment.save();
    response = {
      error: false,
      errorInfo: null,
      data: {
        shipmentId: shipment.id,
        shipmentStatus: result.shipmentStatus,
      },
    };
  } catch (err: any) {
    console.log("[ERROR] Shipment status not updated due to error");
    response = handleError(err, "Failed to update shipment status");
  }
  res.send(response);
};

// OPTIONAL
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;
  let response: ServerResponse;
  try {
    const user: User | null = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const result = await user.destroy();
    response = { error: false, errorInfo: null, data: { userId: userId } };
  } catch (err) {
    console.log("[ERROR] Delete user operation failed");
    response = handleError(err, 'Failed to delete user');
  }

  res.send(response);
};

// export const modifyUser = (req: Request, res: Response, next: NextFunction) => {
//   res.send("Modify user route");
// };
