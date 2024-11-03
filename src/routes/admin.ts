import { Router } from "express";
import * as AdminController from '../controllers/admin';

const router = Router();

router.post('/update-shipment-status', AdminController.updateShipmentStatus);

// OPTIONAL
router.post('/delete-user', AdminController.deleteUser);
router.post('/modify-user', AdminController.modifyUser);

export default router;