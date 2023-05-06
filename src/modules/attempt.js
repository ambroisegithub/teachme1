import mongoose from "mongoose";
const attemptSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "studentId  is required"],
  },
  assignmentId: {
    type: String,
    required: [true, "Title field is required"],
  }
 
});
const AttemptModel = mongoose.model("Attempt", attemptSchema);

export default AttemptModel;
