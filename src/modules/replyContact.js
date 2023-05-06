import mongoose from "mongoose"
import validator from "validator"
const replySchema = new mongoose.Schema({
email:{
    type:String,
    required:[true,"The email is required"],
    validator:[validator.isEmail,"please provide vali email"]
},
message:{
    type:String,
    required:[true,"The message is required"],
},
createdAt: { type: Date, default: Date.now }

})

const replycontactModel = mongoose.model("Reply message",replySchema)

export default replycontactModel;