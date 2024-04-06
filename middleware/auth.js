import { User } from "../models/users.js";
import { Teacher } from "../models/teacher.js";
import  Jwt  from "jsonwebtoken";
import ErrorHandler from "./error.js";
export const isAuthenticated = async (req,res,next)=>{
    const {token}= req.cookies;
    if(!token) return res.status(404).json({
     success:false,
     message:"login first",
     });

 const decoded = Jwt.verify(token,process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
 next();
    
}
export const isAuthenticatedteacher = async (req,res,next)=>{
    const {token}= req.cookies;
    if(!token) return res.status(404).json({
     success:false,
     message:"login first",
     });

 const decoded = Jwt.verify(token,process.env.JWT_SECRET);
  req.user = await Teacher.findById(decoded._id);
 next();
    
}

export const authorizeRoles = (...roles)=>{


    return (req,res,next)=>{

      if(!roles.includes(req.user.role)){
        return next(
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)
        );
      }

      next();

    }

}