import express from "express";
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//Buy subscription
router.route("/subscribe").get(isAuthenticated, buySubscription)

//payment verification and save reference in db
router.route("/paymentverification").post(isAuthenticated, paymentVerification)

// Get Razorpay key
router.route("/razorpaykey").get(getRazorPayKey)

// Cancel subscription
router.route("/subscribe/cancel").delete(isAutenticated, cancelSubscription)

export default router;