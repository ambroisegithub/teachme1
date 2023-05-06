
import {uploadimage} from "../helpers/multer"
import express from "express";
import {
  getAllPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost
 
} from "../controllers/blog";
// import { Authorization } from "../middleware/Authorization";

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *      summary: "Creates an account for barefoot nomad"
 *      description: "Needed is youe first and last name, your email and password"
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                "firstName":
 *                 type: string
 *                 required: true
 *                "lastName":
 *                 type: string
 *                 required: true
 *                "email":
 *                 type: string
 *                 required: true
 *                "password":
 *                 type: string
 *                 required: true
 *
 *
 *
 *      responses:
 *       "201":
 *         description: "Account created"
 *       "200":
 *         description: Success
 *       "403":
 *         description: "Account creation failed"
 *
 */

router.get("/blog", getAllPosts);
router.post("/blog", uploadimage.single("image") ,createPost);
router.patch("/blog/:id", updatePost);
router.route("/blog/:id").get(getSinglePost).delete(deletePost);
// router.post("/comment/:id", Authorization, createComment);

export default router;