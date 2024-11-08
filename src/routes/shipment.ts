import { Router } from "express";
import * as ShipmentController from '../controllers/shipment-controller';
import { validateUser, validateAdmin } from "../middleware/auth-validation";

// configure router for shipment related functionality
const router = Router();

router.use(validateUser)
router.get('/shipments', ShipmentController.getShipments);
router.get('/shipments/:shipmentID', ShipmentController.getShipmentDetails);
router.post('/create-shipment', ShipmentController.createShipment);

router.use(validateAdmin);
router.post('/update-shipment', ShipmentController.updateShipmentStatus)

export default router;