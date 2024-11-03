/** this is the admin controller, should contain functionality for
 * 
 * 1. Changing shipment status
 * 
 * NO SHIPMENT CREATION FUNCTIONALITY
 * OPTIONAL
 * 1. Delete existing users
 */

import {Request, Response, NextFunction} from 'express';

export const updateShipmentStatus = (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.shipmentId;
    const newStatus = req.body.shipmentStatus;

    
}

// OPTIONAL
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    res.send('Delete user route');
}
export const modifyUser = (req: Request, res: Response, next: NextFunction) => {
    
    res.send('Modify user route')
}