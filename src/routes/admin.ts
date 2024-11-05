import { Router } from "express";
import * as AdminController from '../controllers/admin-controller';
import { validateUser } from '../middleware/auth-validation'

// configure routes for admin functionality
const router = Router();

router.post('/update-shipment-status', AdminController.updateShipmentStatus);
router.post('/delete-user', AdminController.deleteUser);

export default router;