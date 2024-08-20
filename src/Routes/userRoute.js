import express from 'express';
const router = express.Router();
import { userLogin, userRegister } from '../Controllers/userController.js';

router.post("/userRegister",userRegister);
router.post("/userLogin",userLogin);






export default router;

