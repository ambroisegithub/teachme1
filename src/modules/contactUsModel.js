import mongoose from "mongoose"
import validator from "validator"
const contactUsSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"The name is required"],
},

email:{
    type:String,
    required:[true,"The email is required"],
    validator:[validator.isEmail,"Please Provide The Valid Email"]
},

message:{ 
    type:String,
    required:[true,"The message is required"],
},
Reply:{
    type: Array,
},
createdAt: { type: Date, default: Date.now }

})

const contactUsModel = mongoose.model("Contuct US",contactUsSchema)

export default contactUsModel;