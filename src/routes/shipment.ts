import { Router } from "express";
import * as ShipmentController from '../controllers/shipment';

const router = Router();

router.get('/shipments', ShipmentController.getShipments);
router.post('/create-shipment', ShipmentController.createShipment);

// OPTIONAL
router.get('/shipment/:shipmentID', ShipmentController.getShipmentDetails);
router.post('/update-shipment', ShipmentController.updateShipment);

export default router;