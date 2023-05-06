import StudentAccountRegisterModels from "../modules/StudentAccountRegisterModels"

import jwt from "jsonwebtoken";
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
};

export const signup = async (req, res) => {
  try {
    // Check if email already exists
    const userExists = await StudentAccountRegisterModels.findOne({ studentemail: req.body.studentemail });
    if (userExists) {
      return res.status(400).json({
        status: "failed",
        message: "Email already taken",
      });
    }

    // Create the user
    const user = await StudentAccountRegisterModels.create({
      parentId :req.parents._id,
      studentemail:req.body.studentemail,
      studentfullName:req.body.studentfullName,
      password:req.body.password,
      dateOfbirth:req.body.dateOfbirth,
      gender:req.body.gender,
      level:req.body.level,
      course:req.body.course,
      studyingStyle:req.body.studyingStyle,
      Usertype:req.body.Usertype
    });

    // Generate a token for the user
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token: token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { studentemail, password } = req.body;
console.log(req.body);
  if (!studentemail || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide email and password",
    });
  }

  const userSign = await StudentAccountRegisterModels.findOne({ studentemail }).select("+password");
  if (!userSign || !(await userSign.correctPassword(password, userSign.password))) {
    return res.status(401).json({
      status: "failed",
      message: "Incorrect email or password",
    });
  }

  const token = signToken(userSign._id);

  res.status(200).json({
    status: "success",
    token,
    userSign,
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await StudentAccountRegisterModels.find();

    res.status(200).json({
      status: "success",
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await StudentAccountRegisterModels.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
