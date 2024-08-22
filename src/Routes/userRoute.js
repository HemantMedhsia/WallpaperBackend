import express from 'express';
const router = express.Router();
import { userLogin, userRegister } from '../Controllers/userController.js';
import { deleteMobileId, getAllMobileIds, getMobileId, setMobileId } from '../Controllers/mobileIdController.js';

router.post("/userRegister",userRegister);
router.post("/userLogin",userLogin);
router.post("/store-mobile-id/",setMobileId);
router.get("/get-mobile-id/:id",getMobileId);
router.get("/get-all-mobile-ids",getAllMobileIds);
router.delete("/delete-mobile-id/:id",deleteMobileId);






export default router;

