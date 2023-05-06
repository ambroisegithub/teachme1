import express from 'express';
import {
    getAllQuiz,getAllQuestion
} from '../controllers/StudentController'

const router = express.Router();

router.get('/getallquiz', getAllQuiz);
router.get('/getallquestion/:quizId', getAllQuestion);

export default router;
