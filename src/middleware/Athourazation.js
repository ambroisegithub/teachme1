import jwt from "jsonwebtoken"
import User from "../modules/user"
const Authorization = async (req, res, next) => {
    try {
      console.log(req.headers);
      const token = req.headers.authorization;
      console.log(token);
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user.Usertype === "teacher") {
          next();
        } else  if(user.Usertype!=="teacher"){
          return res.status(401).json({
            message: "The operation are performed by teacher"
          });
        }
      } else {
        return res.status(401).json({
          status: "failed",
          message: "Not authorized"
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Check Your Token IF Is valid"
      });
    }
  };
  
  export default Authorization;
  