import mongoose from 'mongoose';
import validator from 'validator';
const bookTeacherSchema = new mongoose.Schema({
      teacherID:{
      type:String
      },
      teacherFullName:{
         type: String,
        required:[true,"teacher fullName are required"]
      },
      teacheremail:{
        type:String,
        required:[true,"the Teacher fullName are required"]
      },
      studentfullName: {
        type: String,
        required: [true, "The fullName of required"],
    
      },
      studentemail: {
        type: String,
        validate:[validator.isEmail,"Please enter a valid email"],
        required: [true, "The email  is required"],
      },
      studentId: {
        type: String,
        required: [true, "The student id  is required"],
      },
      dateOfbirth: {
        type: String,
      
      },
      studentgender: {
        type:String
      },
      parentId: {
        type: String
      },
      parentname:{
        type:String,
        required:[true,"the parent names are required"]
      },
      parentemail:{
        type:String,
        required:[true,"the parent names are required"]
      },
      
      status:{
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
      }

})

const bookTeachermodel= mongoose.model("BookTeacher",bookTeacherSchema);
export default bookTeachermodel;