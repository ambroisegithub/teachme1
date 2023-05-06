import express from "express";
import studentMiddleware from "../middleware/studentMiddleware"
import {getAllAttempt,attemptCourse,deleteAttempt} from "../controllers/attempt";
// import fileUpload from "../helpers/multer2";

// Create router
const router = express.Router();
// Create routes
router.get("/attempt",studentMiddleware,getAllAttempt)
router.post("/attemptreq/:id",studentMiddleware,attemptCourse)
router.delete("/deleteattempt/:id",studentMiddleware,deleteAttempt)


// router.get("/GetAll", UserController.allUser);
// Export router
export default router;