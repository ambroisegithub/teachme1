
import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema ({
   image:{
    type: String,
    required: [true, "the image is required"],
   },
    assignmentName:{
    type:String,
    required:[true,"the assignment field does not be empty"]
   },
   publishDate:{
    type:String,
    required:[true,"the publication date field is required"]
   } ,
   courseName:{
    type:String,
    required:[true,"the course position field is required"]
   },
   courseCategory:{
    type:String,
    required:[true,"the couse category can not be empty"]
   },

   maxmarks:{
    type:String,
    required:[true,"the maximum number of marks is required"]
   },
   submitiontype:{
    type:String,
    required:[true,"the submission type field is required"]
},
  contentofcourse:{
    type:String,
    required:[true,"the content of course field is required"]
}
})
const assignmentModel = mongoose.model("Assignments",assignmentSchema);
export default assignmentModel;



// import mongoose from "mongoose"
// const assignmentSchema = new mongoose.Schema ({
//    image:{
//     type: String,
//     required: [true, "the image is required"],
//   },
//     assignmentName:{
//     type:String,
//     required:[true,"the assignment field does not be empty"]
//    },
//    publishDate:{
//     type:String,
//     required:[true,"the publication date field is required"]
//    } ,
//    courseName:{
//     type:String,
//     required:[true,"the course position field is required"]
//    },
//    courseCategory:{
//     type:String,
//     required:[true,"the couse category can not be empty"]
//    },

//    maxmarks:{
//     type:String,
//     required:[true,"the maximum number of marks is required"]
//    },
//    submitiontype:{
//     type:String,
//     required:[true,"the submission type field is required"]
// },
// contentofcourse:{
//     type:String,
//     required:[true,"the content of course field is required"]
// }
// })
// const assignmentModel = mongoose.model("Assignments",assignmentSchema);
// export default assignmentModel;