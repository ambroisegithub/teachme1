
import attemptModel from "../modules/attempt"


export const getAllAttempt = async (req, res) => {
    try {
      const Assignment = await attemptModel.find({studentId: req.student._id});
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
  

export const attemptCourse = async (req, res) => {
  
    try {
      // const result = await UploadToCloud(req.file, res);
  
      const newPost = await attemptModel.create({
        studentId: req.student._id,
        assignmentId : req.params.id

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

  export const deleteAttempt= async (req, res) => {
    const id = req.params.id;
  
    try {
      const post = await attemptModel.findByIdAndDelete(id);
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