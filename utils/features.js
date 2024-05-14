import Jwt  from "jsonwebtoken";

export const sendcookie=(user,res,message,statuscode=201)=>{
    const token =Jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        // sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        // secure : process.env.NODE_ENV==="Development"?false:true,
    }).json({
        success:true,
        message,
    })
}