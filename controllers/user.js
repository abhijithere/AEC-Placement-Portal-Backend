import { User } from "../models/users.js";
import { sendcookie } from "../utils/features.js";
import bcrypt from "bcrypt"
import { asyncerror } from "../middleware/catchAsyncError.js";




export const getallusers = asyncerror( async (req,res)=>{

    try {
        const users = await User.find({});

    res.status(201).json({
        success:true,
        users,
    })
    } catch (error) {
        res.status(401).json({
            success:false,
        })
        
    }

    

})

export const getuserdetails = asyncerror(async (req,res)=>{

    const user = await User.findById(req.user.id);


    res.status(200).json({
        success:true,
        user,
    })
    
})


export const register =asyncerror(async(req,res)=>{
    try {

        const {name,studentid,email,department,password} = req.body;
        let user = await User.findOne({studentid})
    
        if(user) return res.status(404).json({
            success:false,
            message:"user already exist",
        })
        const hashedpassword = await bcrypt.hash(password,10);
        user = await User.create({name,studentid,email,department,password:hashedpassword})
    
        sendcookie(user,res,"registered successfully",201)
        
        
    } catch (error) {
        res.status(404).json({
            success:false,
        })
    }
 


})

    export const login = asyncerror(async (req,res)=>{

        try {
            
     const {studentid,password}=req.body;
        let user = await User.findOne({studentid}).select("+password");

        if(!user) return res.json({
            success:false,
            message:"invalid studentid or password",
        })
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) res.status(404).json({
            success:false,
            message:"invalid studentid or password",
        })
        sendcookie(user,res,`welcome back ${user.name} `,201)
        } catch (error) {

              res.status(404).json({
            success:false,
        })
        }

        
        

    })
    export const logout = asyncerror((req,res)=>{
        try {
            res.status(200).cookie("token","",{
                expires: new Date(Date.now()),
                sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
                secure : process.env.NODE_ENV==="Development"?false:true,
            
            }).json({
                success:true,
                user:req.user,
            })

        } catch (error) {
            res.status(404).json({
                success:false,})
        }

        
    })

    export const updateuser =asyncerror(async(req,res)=>{

        try {
            const task = await User.findById(req.user.id);

        task.name=req.body.name;
        task.email=req.body.email;
        task.department=req.body.department;
        
        await task.save();

        res.status(200).json({
            success:true,
            message:"user updated"
        })

        } catch (error) {
            res.status(404).json({
                success:false,})
        }

        
    })

    export const deleteUser = asyncerror(async(req,res,next)=>{

        try {

            const task = await User.findById(req.params.id);
        console.log(task)
        
        if(!task) return res.status(404).json({
            success:false,
            message:"invalid id"
        })
        
        await task.deleteOne();
    
        res.status(200).json({
            success:true,
            message:"user deleted"
        })
            
        } catch (error) {
            res.status(404).json({
                success:false,})
        }        
        
    })