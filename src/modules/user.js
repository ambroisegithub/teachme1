import mongoose from "mongoose"
import  validator from "validator"
import bcrypt from "bcryptjs"
const Userschema  = new mongoose.Schema({
//  parentId:{
//        type:"string"
//  },
    name:{
        type:"string",
        required:[true,"the name is required"]
    },
    email:{
      type:"string",
      required:[true,"the email is required"],
      validator:[validator.isEmail,"Please enter a valid email address"],  
    },
    password:{
        type:"string",
        required:[true,"The password field does not be empty"],
        minLength:6,
        maxLength:100,
        select:false
    },

    Usertype:{
        type:'String',
        enum:["teacher","parents","student"],
        default:"parents"
},
gender:{
    type:"String",
    enum:["male","female"],
    default:"male"
},
    passwordResetToken: String,
    passwordResetExpires: Date,

});
Userschema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
  });
  
  Userschema.methods.correctPassword = async function (cpassword, password) {
    return await bcrypt.compare(cpassword, password);
  };
  const user = mongoose.model("User", Userschema);
  export default user;