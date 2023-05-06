import express from 'express';
import {
    createQuiz,getUploadquiz,
deleteQuiz,uploadQuiz,addQuestion,getAllQuestions,deleteQuestionById,getQuestionById
} from '../controllers/TeacherController';

const router = express.Router();
router.post('/createquiz', createQuiz);
router.get('/getuploadquiz/:quizId',getUploadquiz);
// router.get('/gethomequiz', getHomeQuiz);
router.delete('/deletequiz/:quizId', deleteQuiz);
router.post('/uploadquiz/:quizId',uploadQuiz);
router.post('/addquestion/:quizId',addQuestion);
router.get('/getallquestion/:quizId',getAllQuestions);
router.get('/getOnequstion/:quizId/:questionId',getQuestionById);
router.delete('/deletequestion/:quizId/:questionId',deleteQuestionById);

export default router;


/**
 * @swagger
 * /api/v1/createquiz:
 *   post:
 *     summary: Create a quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: body
 *         name: quiz
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             quizname:
 *               type: string
 *               description: The name of the quiz
 *             quizdescription:
 *               type: string
 *               description: The description of the quiz
 *     responses:
 *       '201':
 *         description: Quiz created successfully
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
 *                   example: Quiz created successfully
 *                 content:
 *                   type: object
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: Invalid quizId
 *
 * /api/v1/addquestion/{quizId}:
 *   post:
 *     summary: Add a question to the quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the quiz to add a question to
 *       - in: body
 *         name: question
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             questionText:
 *               type: string
 *               description: The text of the question
 *             answer:
 *               type: string
 *               description: The answer to the question
 *             options:
 *               type: array
 *               description: The options for the question
 *               items:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Question added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid quizId
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Quiz not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       properties:
 *         quizId:
 *           type: string
 *           description: The ID of the quiz
 *         quizname:
 *           type: string
 *           description: The name of the quiz
 *         quizdescription:
 *           type: string
 *           description: The description of the quiz
 *         owner:
 *           type: string
 *           description: The ID of the owner of the quiz
 *         owneremail:
 *           type: string
 *           description: The email of the owner of the quiz
 *     Question:
 *       type: object
 *       properties:
 *         questionId:
 *           type: number
 *           description: The ID of the question
 *         questionText:
 *           type: string
 *           description: The text of the question
 *         answer:
 *           type: string
 *           description: The answer to the question
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: The array of options for the question
 */