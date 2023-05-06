import CourseModel from "../modules/course"; 
import cloudinary from "cloudinary"
import dotenv from "dotenv";
dotenv.config();
// cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});


export const getAllCourse= async (req, res) => {
  try {
    const Course = await CourseModel.find();
    return res.status(200).json({
      status: "success",
      number: Course.length,
      Course,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};


export const CreateCourse = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log(result);
  console.log(req.file);
  try {
    // const result = await UploadToCloud(req.file, res);
   
    const newPost = await CourseModel.create({
      video: result.secure_url,
      title: req.body.title,
      description: req.body.description,
      codeOfCourse: req.body.codeOfCourse,
     
    });
    return res.status(201).json({
      status: "success",
      message: "Course created successfully",
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
export const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UploadToCloud(req.file, res);

    const post = await CourseModel.findById(id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Id of post not found",
      });
    }
    await CourseModel.findByIdAndUpdate(id, {
      video: result.secure_url,
      title: req.body.title,
      description: req.body.description,
      codeOfCourse: req.body.codeOfCourse
     
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


export const getSingleCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await CourseModel.findById(id);
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
export const deleteCourse = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await CourseModel.findByIdAndDelete(id);
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

