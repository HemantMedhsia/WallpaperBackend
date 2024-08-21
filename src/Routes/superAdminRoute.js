import express from 'express';
const router = express.Router();
import {registerSuperAdmin,loginsuperAdmin} from '../Controllers/superAdminController.js';
import { getAllUser, getUser } from '../Controllers/userController.js';

router.post("/superadminregister",registerSuperAdmin);
router.post("/loginsuperadmin",loginsuperAdmin);
router.get("/alluser",getAllUser);
router.get("/singleuser/:id",getUser);






export default router;