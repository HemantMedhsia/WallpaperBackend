import express from 'express';
import { getAllTransction, getSingleTransaction, payment, validate } from '../Controllers/razorpayController.js';

const router = express.Router();


router.post("/order", payment);
router.post("/validate/:userId",validate);
router.get("/alltransction",getAllTransction);
router.get('/transaction/:id', getSingleTransaction); // Route to get single transaction by ID














export default router;