import Quiz from '../modules/QuizModel';
import Question from '../modules/Question';

export const getAllQuiz = async (req, res) => {
    try {
      const quizzes = await Quiz.find({ upload: true });
      return res.status(200).json(quizzes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };
  

// export const getAllQuestion = (req, res) => {
//     Question.find({ quizid: req.params.id }, (err, qz) => {
//         if (err) {
//             console.log(error);
//             res.json({ errormsg: "some error!" });
//         }
//         else {
//             res.json({ msg: qz });
//         }
//     });
// };


export const getAllQuestion = async (req, res) => {
    try {
        const quizId = req.params.quizId; // Get the quizId from the request params
        const isValidObjectId = ObjectId.isValid(quizId);

        if (!isValidObjectId) { // If quizId is not a valid ObjectId, return error
            return res.status(400).json({ message: "Invalid quizId" });
        }

        const quiz = await Quiz.findById(quizId); // Find the quiz by quizId
        
        if (!quiz) { // If quiz is not found, return error
            return res.status(404).json({ message: "Quiz not found" });
        }
        
        const questions = await Question.find({ _id: { $in: quiz.questions } }); // Find all questions that belong to the quiz
        
        return res.status(200).json({ questions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

