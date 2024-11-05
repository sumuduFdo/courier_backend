import { Router } from "express";
import * as AuthController from '../controllers/auth-controller';

// configure routes for authentication
const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;