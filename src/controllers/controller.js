import Usermodels from "../modules/user";
import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
const app =express();
import crypto from   "crypto"

const keysecret = process.env.SECRET_KEY
// import express from "express"
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
};



export const signup = async (req, res) => {
  try {
    // Check if email already exists
    const userExists = await Usermodels.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        status: "failed",
        message: "Email already taken",
      });
    }

    // Create the user
    const user = await Usermodels.create(req.body);

    // Generate a token for the user
    const token = signToken(user._id);

    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   },
    // });

    // // Send an email notification to the provided email address
    // let info = await transporter.sendMail({
    //   from: "muhayimana21@gmail.com",
    //   to: req.body.email,
    //   subject: "New Signup Form Submission",
    //   html: `<p>Thank you for Signup us, ${req.body.name}!</p>
    //          <p>We have received your message and will get back to you shortly.</p>
    //          `,
    // });

    // Send the response with the token and user data
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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide email and password",
    });
  }

  const userSign = await Usermodels.findOne({ email }).select("+password");
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



export const forgetPassword = async(req,res)=>{
  console.log(req.body)

  const {email} = req.body;

  if(!email){
      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {
      const user = await Usermodels.findOne({email:email});
      console.log("user:", user);

      if (!user) {
        res.status(401).json({status:401,message:"User not found"})
      } else {
        // token generate for reset password
        const token = jwt.sign({_id:user._id},keysecret,{
            expiresIn:"12000s"
        });
        console.log("token:", token);

        const setusertoken = await Usermodels.findByIdAndUpdate({_id:user._id},{token},{new:true});
        console.log("setusertoken:", setusertoken);

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Reset Password',
          text: `Please click on the following link to reset your password: http://localhost:5558/api/v1/changePassword/${user._id}/${token}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
          status: 'success',
          message: 'Reset password link sent to your email',
        });
      }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'failed',
      message: 'Error sending email',
    })
  }
}


export const getForgetPassword =  async(req,res)=>{
  const {id,token} = req.params;

  try {
      const user = await Usermodels.findOne({_id:id,token});
      
      const verifyToken = jwt.verify(token,keysecret);

      console.log(verifyToken)

      if(user && verifyToken._id){
          res.status(201).json({status:201,user})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
};


// change password

export const changePassword = async(req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const user = await Usermodels.findOne({_id:id,token});
      
      const verifyToken = jwt.verify(token,keysecret);

      if(user && verifyToken._id){
          const newpassword = await bcrypt.hash(password,12);

          const setnewuserpass = await Usermodels.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
}


export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Usermodels.find();

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
    const user = await Usermodels.findById(req.params.id);
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
