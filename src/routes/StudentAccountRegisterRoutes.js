import express  from "express";
// import  Athourazation from "../middleware/Athourazation"
import  authorization  from "../parentMiddleware/parentMiddleware";
import { getAllUsers,login, signup,getOneUser } from "../controllers/StudentAccountRegisterControllers";
const router = express.Router();
router.post('/signup',authorization,signup);
router.post('/signin',login);
router.get("/getOneUser/:id",getOneUser)
router.get('/users',getAllUsers);



/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new student account
 *     tags:
 *       - [Students Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the student
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the student
 *               password:
 *                 type: string
 *                 description: The password of the student
 *               dateOfbirth:
 *                 type: string
 *                 description: The date of birth of the student
 *               gender:
 *                 type: string
 *                 description: The gender of the student
 *               level:
 *                 type: string
 *                 description: The level of the student
 *               course:
 *                 type: string
 *                 description: The course of the student
 *               studyingStyle:
 *                 type: string 
 *                 description: The studying style of the student 
 *               Usertype:
 *                 type: string 
 *                 description: The Usertype  student
 *             example:
 *               fullName: John Doe
 *               email: john.doe@example.com
 *               password: password123
 *               dateOfbirth: 2000-01-01
 *               gender: Male
 *               level: Freshman
 *               course: Computer Science
 *               studyingStyle: Visual
 *     responses:
 *       '200':
 *         description: Successfully registered a new student account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 token:
 *                   type: string
 *                   description: The JWT token for the registered student
 *                 user:
 *                   type: object
 *                   description: The registered student's information
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique ID of the student
 *                     fullName:
 *                       type: string
 *                       description: The full name of the student
 *                     email:
 *                       type: string
 *                       description: The email address of the student
 *                     password:
 *                       type: string
 *                       description: The password of the student
 *                     dateOfbirth:
 *                       type: string
 *                       description: The date of birth of the student
 *                     gender:
 *                       type: string
 *                       description: The gender of the student
 *                     level:
 *                       type: string
 *                       description: The level of the student
 *                     course:
 *                       type: string
 *                       description: The course of the student
 *                     studyingStyle:
 *                       type: string
 *                       description: The studying style of the student
 *                     Usertype:
 *                       type: string 
 *                       description: The Usertype  student
 *             example:
 *               status: success
 *               token: JWT_TOKEN
 *               user:
 *                 _id: STUDENT_ID
 *                 fullName: John Doe
 *                 email: john.doe@example.com
 *                 password: PASSWORD_HASH
 *                 dateOfbirth: 2000-01-01
 *                 gender: Male
 *                 level: Freshman
 *                 course: Computer Science
 *                 studyingStyle: Visual
 *       400:
 *         description: Error occurred during registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 error:
 *                   type: string
 * /signin:
 *   post:
 *     summary: Login to an existing account
 *     tags: [Students Login]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid request body or missing email/password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [failed]
 *                 message:
 *                   type: string
 *       401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [failed]
 *                 message:
 *                   type: string
 *
 * /users:
 *   get:
 *     summary: Get all Students Parents registed
 *     tags: [get All Students] 
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       description: The list of users
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                   example: failed
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Invalid request
 *
 * 
 * /getOneUser/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [get One Student] 
 *     description: Retrieve a single user record by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request parameters or server error.
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
 *                   example: Error message here.
 *       404:
 *         description: User not found.
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
 *                   example: User not found.
 */
  



export default router;

