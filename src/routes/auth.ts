import { Router } from "express";
import * as AuthController from '../controllers/auth';

const router = Router();

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);

export default router;