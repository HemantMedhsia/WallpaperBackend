import express from 'express';
import { getAllTransction, getSingleTransaction, payment, validate,  verifyTokenWithId, verifyTokenwithMobile } from '../Controllers/razorpayController.js';


const router = express.Router();


router.post("/order", payment);
router.post("/validate/:userId",validate);
router.get("/alltransction",getAllTransction);
router.post('/transaction/:id', getSingleTransaction); // Route to get single transaction by ID
router.post("/verify-id/:userid",verifyTokenWithId);
router.post("/verify-mobile/:userMobile",verifyTokenwithMobile);














export default router;