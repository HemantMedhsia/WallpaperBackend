import express from 'express';
import { getAllTransction, getSingleTransaction, payment, validate, verifyToken } from '../Controllers/razorpayController.js';


const router = express.Router();


router.post("/order", payment);
router.post("/validate/:userId",validate);
router.get("/alltransction",getAllTransction);
router.post('/transactions/:id', getSingleTransaction); // Route to get single transaction by ID
router.post("/verify/:userid",verifyToken);














export default router;