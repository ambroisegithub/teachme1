import Quiz from '../modules/QuizModel';
import Question from '../modules/Question';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library to generate unique ids

export const createQuiz = async (req, res) => {
    try {
        const { userId, email } = req;
        const quizId = uuidv4(); // Generate a unique id for the quiz
        
        const quiz = await Quiz.create({
            quizId: quizId,
            quizname: req.body.quizname,
            quizdescription: req.body.quizdescription,
            owner: userId,
            owneremail: email
        });
        
        console.log(quiz);
        return res.status(201).json({
            status: "success",
            message: "Quiz created successfully",
            content: {
                quiz
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            error: error.message
        });
    }
};


import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const addQuestion = async (req, res) => {
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
        
        // Create a new question object
        const newQuestion = await Question.create({
            questionId: quiz.questions.length + 1,
            questionText: req.body.questionText,
            answer: req.body.answer,
            options: req.body.options
        });
        

        quiz.questions.push(newQuestion);
        await quiz.save();
        
        return res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};


export const getAllQuestions = async (req, res) => {
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



    export const getQuestionById = async (req, res) => {
        try {
            const quizId = req.params.quizId;
            const questionId = req.params.questionId;
    
            // Check if quizId is a valid ObjectId
            const isValidQuizId = ObjectId.isValid(quizId);
            if (!isValidQuizId) {
                return res.status(400).json({ message: "Invalid quizId" });
            }
    
            // Check if quiz exists
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }
    
            // Check if questionId is a valid ObjectId
            const isValidQuestionId = ObjectId.isValid(questionId);
            if (!isValidQuestionId) {
                return res.status(400).json({ message: "Invalid questionId" });
            }
    
            // Check if question exists in quiz
            const question = quiz.questions.find(q => q._id.toString() === questionId);
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }
    
            return res.status(200).json({ question });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    };
    
    export const deleteQuestionById = async (req, res) => {
        try {
            const quizId = req.params.quizId;
            const questionId = req.params.questionId;
    
            // Check if quizId is a valid ObjectId
            const isValidQuizId = ObjectId.isValid(quizId);
            if (!isValidQuizId) {
                return res.status(400).json({ message: "Invalid quizId" });
            }
    
            // Check if quiz exists
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }
    
            // Check if questionId is a valid ObjectId
            const isValidQuestionId = ObjectId.isValid(questionId);
            if (!isValidQuestionId) {
                return res.status(400).json({ message: "Invalid questionId" });
            }
    
            // Check if question exists in quiz
            const question = quiz.questions.find(q => q._id.toString() === questionId);
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }
    
            // Remove the question from the quiz's questions array and save the quiz
            await Question.findByIdAndRemove(questionId);
            quiz.questions.remove(question);
            await quiz.save();
    
            return res.status(200).json({ message: "Question deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    };


export const uploadQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    
    // Check if quizId is a valid ObjectId
    const isValidQuizId = ObjectId.isValid(quizId);
    if (!isValidQuizId) {
        return res.status(400).json({ message: "Invalid quizId" });
    }

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }


    if (quiz.questions.length < 5) { // If quiz has less than 5 questions, return error
      return res.status(400).json({ message: "You must have 5 questions in the quiz to upload the quiz!" });
    }

    // Update the quiz with the upload property set to true
    await Quiz.updateOne({ _id: quizId }, { upload: true });

    return res.status(200).json({ message: 'Quiz uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

            export const getUploadquiz = async (req, res) => {
                try {
                  const quizId = req.params.quizId;
              
                  // Check if quizId is a valid ObjectId
                  const isValidQuizId = ObjectId.isValid(quizId);
                  if (!isValidQuizId) {
                    return res.status(400).json({ message: "Invalid quizId" });
                  }
              
                  // Check if quiz exists and is uploaded
                  const quiz = await Quiz.findOne({ _id: quizId, upload: true });
                  if (!quiz) {
                    return res.status(404).json({ message: "Quiz not found or not uploaded" });
                  }
              
                  return res.status(200).json(quiz);
                } catch (error) {
                  console.error(error);
                  return res.status(500).json({ message: 'Something went wrong' });
                }
              };

            // export const deleteQuiz = (req, res) => {
            //     const id = req.params.id;
            //     Quiz.deleteOne({ _id: id }, (err) => {
            //         if (err) {
            //             res.json({ msg: "Something went wrong!!" });
            //             console.log("Error in delete by admin");
            //         }
            //     });
            //     Question.deleteMany({ quizid: id }, (err) => {
            //         if (err) {
            //             res.json({ msg: "Something went wrong!!" });
            //             console.log("Error in delete by admin");
            //         }
            //     });
            //     const io = req.app.get('io');
            //     io.emit("quizcrud", "Quiz CRUD done here");
            //     res.status(200).json({ msg: "Successfully deleted quiz by admin" });
            // };
            

            export const deleteQuiz = async (req, res) => {
                try {
                  const quizId = req.params.quizId;
              
                  // Check if quizId is a valid ObjectId
                  const isValidQuizId = ObjectId.isValid(quizId);
                  if (!isValidQuizId) {
                    return res.status(400).json({ message: "Invalid quizId" });
                  }
              
                  // Find the quiz with the given quizId
                  const quiz = await Quiz.findById(quizId);
              
                  // Check if quiz exists
                  if (!quiz) {
                    return res.status(404).json({ message: "Quiz not found" });
                  }
              
                  // Check if the authenticated user owns the quiz
                  if (quiz.owner !== req.userId) {
                    return res.status(403).json({ message: "You are not authorized to delete this quiz" });
                  }
              
                  // Delete the quiz
                  await Quiz.deleteOne({ _id: quizId });
              
                  return res.status(200).json({ message: "Quiz deleted successfully" });
                } catch (error) {
                  console.error(error);
                  return res.status(500).json({ message: 'Something went wrong' });
                }
              };
              















// import QuizModel from "../modules/QuizModel"; 
// import {UploadToCloud} from "../helpers/cloud.js"
// export const getAllQuiz = async (req, res) => {
//   try {
//     const Quiz = await QuizModel.find();
//     return res.status(200).json({
//       status: "success",
//       number: Quiz.length,
//       Quiz,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };
// export const CreateQiuz = async (req, res) => {
//   try {
//     const result = await UploadToCloud(req.file, res);
//     const newPost = await QuizModel.create({
//       image: result.secure_url,
//       quiztopic: req.body.quiztopic,
//       quizdescription: req.body.quizdescription,
//       mark: req.body.mark,
//       adress: req.body.adress,
//       date: req.body.date
//     });
//     return res.status(201).json({
//       status: "success",
//       message: "Quiz created successfully",
//       content: {
//         newPost,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };
// export const updateQiuz = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await UploadToCloud(req.file, res);

//     const post = await QuizModel.findById(id);
//     if (!post) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of post not found",
//       });
//     }
//     await QuizModel.findByIdAndUpdate(id, {
//       image: result.secure_url,
//       quiztopic: req.body.quiztopic,
//       quizdescription: req.body.quizdescription,
//       mark: req.body.mark,
//       adress: req.body.adress,
//       date: req.body.date
//     });

//     return res.status(200).json({
//       status: "success",
//       message: "Post updated successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error,
//     });
//   }
// };


// export const getSingleQuiz = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const post = await QuizModel.findById(id);
//     if (!post) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of post not found",
//       });
//     }
//     return res.status(200).json({
//       status: "success",
//       post,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error,
//     });
//   }
// };
// export const deleteQiuz = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const post = await QuizModel.findByIdAndDelete(id);
//     if (!post) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of post not found",
//       });
//     }
//     return res.status(204).json({
//       status: "success",
//       message: "Post deleted successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error,
//     });
//   }
// };









