// src/routes/loginRoute.js

import express from 'express';
import { loginAdmin } from '../Controllers/loginController.js';

const router = express.Router();

// Define routes
router.post('/login', loginAdmin);

export default router;