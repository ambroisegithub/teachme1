import {uploadVideo} from "../helpers/video"
import express from "express";
import {
    getAllCourse,
    CreateCourse,
    updateCourse,
    deleteCourse,
    getSingleCourse
} from "../controllers/course";
const router = express.Router();
router.get("/getAllCourse", getAllCourse);
router.post("/CreateCourse",uploadVideo.single("video"), CreateCourse);
router.patch("/updateCourse/:id", updateCourse);
router.route("/Course/:id").get(getSingleCourse).delete(deleteCourse);
/**

/**
 * @swagger
 * /api/v1/getAllCourse:
 *   get:
 *     summary: Get get Course posts
 *     tags:      
 *       - Get Course
 *     description: Retrieve Course posts from the database.
 *     responses:
 *       200:
 *         description: A list of all Course posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the request.
 *                 number:
 *                   type: number
 *                   description: The number of Course posts returned.
 *                 Course:
 *                   type: array
 *       404:
 *         description: Failed to retrieve Course posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the request.
 *                 error:
 *                   type: string
 *                   description: The error message.
 */

/**
 * @swagger
 * /api/v1/Course/{id}:
 *   get:
 *     summary: Retrieve a single Course post by ID.
 *     tags:      
 *      - get single Course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Course post to retrieve.
 *     responses:
 *       200:
 *         description: The Course post with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: The specified ID was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Id of post not found
 */
/**
 * @swagger
 * /api/v1/CreateCourse:
 *   post:
 *     summary: Create a new Course post
 *     tags:
 *       - post Course 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               codeOfCourse :            
 *                  type: string
 *     responses:
 *       201:
 *         description: Course post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Course created successfully
 *                 content:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 error:
 *                   type: string
 *                   example: Error message
 */


/**
 * @swagger
 * /api/v1/updateCourse/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     description: Update a post's title, description, and image by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the post to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               codeOfCourse :            
 *                  type: string
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   description: Message indicating the post was updated successfully
 *                   example: "Post updated successfully"
 *       '400':
 *         description: Invalid request parameters or image file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request
 *                   example: "failed"
 *                 error:
 *                   type: string
 *                   description: Error message indicating why the request failed
 */


/**
 * Delete a Course post by ID
 * 
 * @swagger
 * /api/v1/Course/{id}:
 *   delete:
 *     summary: Delete a Course post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Course post to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       400:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Id of post not found
 */



export default router;


