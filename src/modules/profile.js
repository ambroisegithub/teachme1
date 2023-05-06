import validator from "validator"
import mongoose from "mongoose";
const ProfileShcema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "the image is required"],
  },

  exprience: {
    type: String,
    required: [true, "The expreince is required"],
  },
  fullname: {
    type: String,
    required: [true, "The fullname of required"],

  },
  email: {
    type: String,
    validate:[validator.isEmail,"Please enter a valid email"],
    required: [true, "The email  is required"],
  },
  address: {
    type: String
    
  },
  date: {
    type: String,
    required: [true, "The date  is required"],
  },
  course: {
    type: String,
    required: [true, "The course  is required"],
    
  },
  studyingstyle: {
    type: String,
    required: [true, "The course  is required"],
  },
  qualification: {
    type: String,
    required: [false, "The qualification  is required"],
  },
  description: {
    type: String,
    required: [false, "The description  is required"],
  },

  Books:{
    type: Array,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  },

});

const ProfileModel = mongoose.model("Profile", ProfileShcema);
export default ProfileModel;
