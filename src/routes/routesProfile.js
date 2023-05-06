import  Athourazation from "../middleware/Athourazation"
import {uploadimage} from "../helpers/multer"
// import  documentValidator from  '../helpers/validator';
import {profilerequest,StudentsRequest,BookTeacherRequest} from "../controllers/adminController"
import authorization from '../parentMiddleware/parentMiddleware'
import express from "express";
import {
getAllprofile,
CreateProfile,
updateProfile,
getSingleProfile,
deleteProfile,
getBooked,
getAllAprovedTecher,
teacherbooking,
getAllBookedApprovedProfile,


} from "../controllers/profile.js";
const router = express.Router();

router.patch("/profile/:id",profilerequest)
router.patch("/student/:id",StudentsRequest)
router.patch("/Bookteacherrequest/:id",BookTeacherRequest)


router.get("/getBooked", getBooked);
router.get("/getAllprofile",getAllprofile);


router.get("/getAllBookedApprovedProfile",getAllBookedApprovedProfile);
router.get("/getAllAprovedTecher",Athourazation,getAllAprovedTecher);

router.post("/CreateProfile",uploadimage.single("image"),Athourazation,CreateProfile);
// router.post("/CreateProfile/:id", CreateProfile);

// router.post("/bookTeachers/:id/:sId",authorization ,bookTeachers);

router.patch("/updateProfile/:id",Athourazation,updateProfile);
router.route("/booked/:id",Athourazation).get(getSingleProfile).delete(deleteProfile);


router.post('/booking-request/:Tid/:sId',authorization,teacherbooking);

/**
 * @swagger
 * api/v1/getAllprofile:
 *   get:
 *     summary: Get get All profile posts
 *     tags:      
 *       - Get All profile
 *     description: Retrieve all profile posts from the database.
 *     responses:
 *       200:
 *         description: A list of all profile posts.
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
 *                   description: The number of profile posts returned.
 *                 profile:
 *                   type: array
 *       404:
 *         description: Failed to retrieve profile posts.
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
 * /api/v1/booked/{id}:
 *   get:
 *     summary: Retrieve a single profile post by ID.
 *     tags:      
 *      - get single profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the profile post to retrieve.
 *     responses:
 *       200:
 *         description: The profile post with the specified ID.
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
 * /api/v1/Createprofile:
 *   post:
 *     summary: Create a new profile post
 *     tags:
 *       - post profile 
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
 *               exprience:
 *                 type: string
 *               fullname:
 *                 type: string
 *               email:            
 *                  type: string
 *               adress:
 *                  type: string
 *               date:    
 *                  type: string
 *               course: 
 *                  type: string 
 *               studyingstyle:
 *                 type: string
 *               description:
 *                 type: string
 *               qualification:
 *                 type: string
 *     responses:
 *       201:
 *         description: profile post created successfully
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
 *                   example: profile created successfully
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
 * /api/v1/updateProfile/{id}:
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
 *               exprience:
 *                 type: string
 *               fullname:
 *                 type: string
 *               email:            
 *                  type: string
 *               adress:
 *                  type: string
 *               date:    
 *                  type: string
 *               course: 
 *                  type: string 
 *               studyingstyle:
 *                 type: string
 *               description:
 *                 type: string
 *               qualification:
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
 * Delete a profile post by ID
 * 
 * @swagger
 * /api/v1/booked/{id}:
 *   delete:
 *     summary: Delete a profile post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile post to delete
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

/**
 * Create a new Book teacher on a profile post
 * 
 * @swagger
 * /api/v1/bookTeachers/{id}:
 *   post:
 *     summary: Create a new Book teacher on a profile post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile post to add a Book teacher to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Book teacher details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parentname:
 *                 type: string
 *               email:
 *                 type: string
 *               book:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book teacher created successfully
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
 *                   example: Book teacher created successfully
 *                 Book teacher:
 *                   type: object
 *                   example: {
 *                     "_id": "1234567890",
 *                     "name": "John Doe",
 *                     "email": "johndoe@example.com",
 *                     "Book teacher": "This is a great profile post!",
 *                     "createdAt": "2023-02-20T00:00:00.000Z"
 *                   }
 *       400:
 *         description: profile post not found
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
 *                   example: Book teacher could not be created - profile post not found
 */




/**
 * @swagger
 * /api/v1/profile/{id}:
 *   patch:
 *     summary: Update profile request status and send confirmation email to user
 *     tags: [Give access to teacher by Admin] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile request
 *       - in: body
 *         name: body
 *         description: The status of the profile request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [approved, denied]
 *               required: true
 *               description: The status of the profile request
 *     responses:
 *       200:
 *         description: Profile request approved successfully
 *       400:
 *         description: Invalid Profile request status
 *       404:
 *         description: Profile request not found
 *       500:
 *         description: Failed to update Profile request
 *
 * /api/v1/student/{id}:
 *   patch:
 *     summary: Update student request status and send confirmation email to user
 *     tags: [Give access to student by Admin] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student request
 *       - in: body
 *         name: body
 *         description: The status of the student request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [approved, denied]
 *               required: true
 *               description: The status of the student request
 *     responses:
 *       200:
 *         description: Student request approved successfully
 *       400:
 *         description: Invalid Student request status
 *       404:
 *         description: Student request not found
 *       500:
 *         description: Failed to update Student request
 */


/**
 * @swagger
 * /api/v1/booking-request/{Tid}/{sId}:
 *   post:
 *     summary: Book a teacher for a student
 *     description: Allows a parent to book a teacher for their student.
 *     tags:
 *       - TeacherBooking
 *     parameters:
 *       - name: Tid
 *         in: path
 *         required: true
 *         description: The ID of the teacher to book.
 *         schema:
 *           type: string
 *       - name: sId
 *         in: path
 *         required: true
 *         description: The ID of the student to book the teacher for.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parent:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   _id:
 *                     type: string
 *               dateOfbirth:
 *                 type: string
 *               gender:
 *                 type: string
 *             required:
 *               - parent
 *               - dateOfbirth
 *               - gender
 *     responses:
 *       201:
 *         description: Teacher booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "The teacher is booked successfully"
 *                 book:
 *                   type: object
 *                   properties:
 *                     teacherID:
 *                       type: string
 *                     teacherFullName:
 *                       type: string
 *                     teacheremail:
 *                       type: string
 *                     studentfullName:
 *                       type: string
 *                     studentemail:
 *                       type: string
 *                     studentId:
 *                       type: string
 *                     dateOfbirth:
 *                       type: string
 *                     studentgender:
 *                       type: string
 *                     parentname:
 *                       type: string
 *                     parentId:
 *                       type: string
 *                     parentemail:
 *                       type: string
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "failed"
 *                 message:
 *                   type: string
 *                   example: "book Teacher added the id not"
 *       403:
 *         description: Not authorized to book teacher for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You Are Allowed to Book Teacher Of Your Own Students"
 */


export default router;
