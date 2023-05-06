import mongoose from "mongoose"
import  validator from "validator"
import bcrypt from "bcryptjs"
const studentSchema = new mongoose.Schema({
  parentId:{
  type:"String"
  },

   studentfullName:{
    type:"String",
    required:[true,"The fullName is required"]
   },
   studentemail:{
    type:"String",
    required:[true,"The email field does not be empty"],
    validator:[validator.isEmail,"Check if your email is valid"]
   } ,
   password:{
    type:"String",
    required:[true,"The password is required"]
   },
   dateOfbirth:{
    type:"String",
    required:[true,"The dateOfbirth is required"]
   },
   gender:{
    type:"String",
    required:[true,"The gender is required"]
   },
   level:{
   type:"String",
   required:[true,"The level is requred"],
  },
  course:{
   type:"String",
   required:[true,"The Course is required"]
  },
  studyingStyle:{
   type:"String",
   required:[true,"The studying style is required"]
  },

  Usertype:{
    type:'String',
    enum:["student"],
    default:"student"
},
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  },
})
studentSchema.pre("save", async function (next) {
   const user = this;
   if (!user.isModified("password")) return next();
   user.password = await bcrypt.hash(user.password, 10);
   next();
 });
 
 studentSchema.methods.correctPassword = async function (cpassword, password) {
   return await bcrypt.compare(cpassword, password);
 };
const studentModels = mongoose.model("students",studentSchema);
export default studentModels;