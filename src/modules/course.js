
import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema ({
  
   video:{
    type:String,
    required:[true,"the video field is required"]
   },
   title:{
    type: String,
    required: [true, "the title is required"],
   },
    description:{
    type:String,
    required:[true,"the description field does not be empty"]
   },
   codeOfCourse: {
    type:String,
   }
})
const Course = mongoose.model("Course",CourseSchema);
export default Course;


