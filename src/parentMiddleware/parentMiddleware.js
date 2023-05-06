import jwt from "jsonwebtoken";
import User from "../modules/user"

async function authorization(req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user.Usertype === "parents") {
        req.parents = user;
        next();
      } else {
        return res.status(403).json({
          message:
            "Only parent is allowed to book Teacher and To register his/her students",
        });
      }
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
}

export default authorization;