// src/routes/loginRoute.js

import express from 'express';
import { loginAdmin } from '../Controllers/loginController.js';

const router = express.Router();

// Define routes
router.post('/admin/login', loginAdmin);

export default router;