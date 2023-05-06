import assignmentModel from "../modules/modulleAssignments"; 
import cloudinary from "cloudinary"
import upload from "../helpers/multer2"

import dotenv from "dotenv";
dotenv.config();
// cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});


// import {UploadToCloud} from "../helpers/cloud.js"
export const getAllAssignment = async (req, res) => {
  try {
    const Assignment = await assignmentModel.find();
    return res.status(200).json({
      status: "success",
      number: Assignment.length,
      Assignment,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};


export const CreateAssignment = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, { access_mode: 'public' },);
  console.log(result);
  console.log(req.file);
  try {
    // const result = await UploadToCloud(req.file, res);
   
    const newPost = await assignmentModel.create({
      image: result.secure_url,
      assignmentName: req.body.assignmentName,
      publishDate: req.body.publishDate,
      courseName: req.body.courseName,
      courseCategory: req.body.courseCategory,
      maxmarks: req.body.maxmarks,
      submitiontype: req.body.submitiontype,
      contentofcourse: req.body.contentofcourse,
    });
    return res.status(201).json({
      status: "success",
      message: "Assignment created successfully",
      content: {
        newPost,
      },
    });


  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
export const updateAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UploadToCloud(req.file, res);

    const post = await assignmentModel.findById(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    await assignmentModel.findByIdAndUpdate(id, {
      image: result.secure_url,
      assignmentName: req.body.assignmentName,
      publishDate: req.body.publishDate,
      courseName: req.body.courseName,
      courseCategory: req.body.courseCategory,
      maxmarks: req.body.maxmarks,
      submitiontype: req.body.submitiontype,
      contentofcourse: req.body.contentofcourse,
    });

    return res.status(200).json({
      status: "success",
      message: "Post updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error,
    });
  }
};


export const getSingleAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await assignmentModel.findById(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    return res.status(200).json({
      status: "success",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error,
    });
  }
};
export const deleteAssignment = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await assignmentModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    return res.status(204).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error,
    });
  }
};



// import ModelQuiz from "../modules/QuizModel"; 
// const CreateQiuz = async (req, res) => {
//   try {
//     const { quiztopic, quizdescription, mark, date } = req.body;
//     const quiz = await ModelQuiz.create({ quiztopic, quizdescription, mark, date });
//     res.status(201).json({ success: true, data: quiz });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };

// const getAllQuiz = async (req, res) => {
//   try {
//     const quizzes = await ModelQuiz.find();
//     res.status(200).json({ success: true, data: quizzes });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };

// const getSingleQuiz = async (req, res) => {
//   try {
//     const quiz = await ModelQuiz.findById(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({ success: false, error: 'Quiz not found' });
//     }
//     res.status(200).json({ success: true, data: quiz });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };

// const updateQiuz = async (req, res) => {
//   try {
//     const { quiztopic, quizdescription, mark, date } = req.body;
//     let quiz = await ModelQuiz.findById(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({ success: false, error: 'Quiz not found' });
//     }
//     quiz.quiztopic = quiztopic;
//     quiz.quizdescription = quizdescription;
//     quiz.mark = mark;
//     quiz.date = date;
//     quiz = await quiz.save();
//     res.status(200).json({ success: true, data: quiz });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };

// const deleteQiuz = async (req, res) => {
//   try {
//     const quiz = await ModelQuiz.findById(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({ success: false, error: 'Quiz not found' });
//     }
//     await quiz.remove();
//     res.status(200).json({ success: true, data: {} });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };

// export {getAllQuiz,
//   CreateQiuz,
//   updateQiuz,
//   deleteQiuz,
//   getSingleQuiz };










// import assignmentModel from "../modules/modulleAssignments";
// import {UploadToCloud} from "../helpers/cloud.js"
// export const CreateAssignment = async (req, res) => {
//   try {
//     const result = await UploadToCloud(req.file, res);
//     const newAssignments = await assignmentModel.create({
//       image: result.secure_url,
//       assignmentName: req.body.assignmentName,
//       publishDate: req.body.publishDate,
//       courseName: req.body.courseName,
//       courseCategory: req.body.courseCategory,
//       maxmarks: req.body.maxmarks,
//       submitiontype: req.body.submitiontype,
//       contentofcourse: req.body.contentofcourse,
//     });
//      res.status(201).json({
//       status: "success",
//       message: "Assignment created successfully",
//       content: {
//         newAssignments,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };

// export const Allassignment = async (req, res) => {
//   try {
//     const Assignments = await assignmentModel.find();
//     return res.status(200).json({
//       status: "success",
//       number: Assignments.length,  
//       Assignments,                                      
//     });
//   } catch (error) {
//     return res.status(404).json({
//       status: "failed",
//       error: error.message,
//     });
//   }
// };  
// export const UpdateAssignment = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await UploadToCloud(req.file, res);

//     const postnewAssignments = await assignmentModel.findById(id);
//     if (!postnewAssignments) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of post Assignment not found",
//       });
//     }
//     await assignmentModel.findByIdAndUpdate(id, {
     
//       image: result.secure_url,
//       assignmentName: req.body.assignmentName,
//       publishDate: req.body.publishDate,
//       courseName: req.body.courseName,
//       courseCategory: req.body.courseCategory,
//       maxmarks: req.body.maxmarks,
//       submitiontype: req.body.submitiontype,
//       contentofcourse: req.body.contentofcourse,
//     });

//     return res.status(200).json({
//       status: "success",
//       message: "Assignment updated successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error,
//     });
//   }
// };

// export const getAssignment = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const postnewAssignments = await assignmentModel.findById(id);
//     if (!postnewAssignments) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of Assignment not found",
//       });
//     }
//     return res.status(200).json({
//       status: "success",
//       postnewAssignments,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error: error,
//     });
//   }
// };
// export const deleteAssignment = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const postnewAssignments = await assignmentModel.findByIdAndDelete(id);
//     if (!postnewAssignments) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Id of post Assignment not found",
//       });
//     }
//     return res.status(204).json({
//       status: "success",
//       message: "post Assignment deleted successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "failed",
//       error,
//     });
//   }
// };
