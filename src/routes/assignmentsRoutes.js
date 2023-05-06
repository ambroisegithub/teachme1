import {uploadDocument} from "../helpers/multer"
import express from "express";
import   multer from  "multer"
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "cloudinary"
import {
    getAllAssignment,
    CreateAssignment,
    updateAssignment,
    deleteAssignment,
    getSingleAssignment
} from "../controllers/assignment.controllers";

// const  upload  = multer(); 

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function(req, file, callback) {
//       callback(null, 'uploads/') // Set the destination folder for the uploaded file
//     },
//     filename: function(req, file, callback) {
//       callback(null, Date.now() + '-' + file.originalname) // Set the file name for the uploaded file
//     }
//   }),
//   fileFilter: function(req, file, callback) {
//     if (!file.originalname.match(/\.(pdf)$/)) { // Only allow PDF files
//       return callback(new Error('Only PDF files are allowed'))
//     }
//     callback(null, true)
//   }
// });




const router = express.Router();
router.get("/getAllAssignment", getAllAssignment);
router.post("/createAssignment",uploadDocument.single("image"), CreateAssignment);
router.patch("/updateAssignment/:id", updateAssignment);
router.route("/assignment/:id").get(getSingleAssignment).delete(deleteAssignment);
/**

/**
 * @swagger
 * /api/v1/getAllAssignment:
 *   get:
 *     summary: Get get Assignment posts
 *     tags:      
 *       - Get Assignment
 *     description: Retrieve Assignment posts from the database.
 *     responses:
 *       200:
 *         description: A list of all Assignment posts.
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
 *                   description: The number of Assignment posts returned.
 *                 Assignment:
 *                   type: array
 *       404:
 *         description: Failed to retrieve Assignment posts.
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
 * /api/v1/assignment/{id}:
 *   get:
 *     summary: Retrieve a single Assignment post by ID.
 *     tags:      
 *      - get single Assignment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Assignment post to retrieve.
 *     responses:
 *       200:
 *         description: The Assignment post with the specified ID.
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
 * /api/v1/createAssignment:
 *   post:
 *     summary: Create a new Assignment post
 *     tags:
 *       - post Assignment 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               assignmentName:
 *                 type: string
 *               publishDate:
 *                 type: string
 *               courseName:            
 *                  type: string
 *               courseCategory:
 *                  type: string
 *               maxmarks:    
 *                  type: string
 *               submitiontype: 
 *                  type: string 
 *               contentofcourse:
 *                 type: string
 *     responses:
 *       201:
 *         description: Assignment post created successfully
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
 *                   example: Assignment created successfully
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
 * /api/v1/updateAssignment/{id}:
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
 *               image:
 *                 type: string
 *                 format: binary
 *               assignmentName:
 *                 type: string
 *               publishDate:
 *                 type: string
 *               courseName:            
 *                  type: string
 *               courseCategory:
 *                  type: string
 *               maxmarks:    
 *                  type: string
 *               submitiontype: 
 *                  type: string 
 *               contentofcourse:
 *                 type: string
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
 * Delete a Assignment post by ID
 * 
 * @swagger
 * /api/v1/assignment/{id}:
 *   delete:
 *     summary: Delete a Assignment post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Assignment post to delete
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