import express from "express"
import {
    requestPayment,
    
} from "../controllers/momopayments.system";
const router = express.Router();
router.post("/requestPayment", requestPayment);
export default router;