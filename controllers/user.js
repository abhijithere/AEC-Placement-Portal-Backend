import { User } from "../models/users.js";
import { sendcookie } from "../utils/features.js";
import bcrypt from "bcrypt"


export const getallusers =  async (req,res)=>{

    try {
        
        const users = await User.find({});

    res.status(201).json({
        success:true,
        users,
    })
    } catch (error) {
        res.status(404).json({
            success:false,
        })
        
    }

    

}

export const getuserdetails =async (req,res)=>{

    try {
        console.log(req.user._id)
    console.log("hello")
    res.status(200).json({
        success:true,
        user:req.user,
    })
    } catch (error) {
        res.status(404).json({
            success:false,
        })
    }

    
}


export const register =async(req,res)=>{
    try {

        const {name,email,password,profilepic,bio} = req.body;
        let user = await User.findOne({email})
    
        if(user) return res.status(404).json({
            success:false,
            message:"user already exist",
        })
        const hashedpassword = await bcrypt.hash(password,10);
        user = await User.create({name,email,bio,password:hashedpassword,profilepic,bio})
    
        sendcookie(user,res,"registered successfully",201)
        
    } catch (error) {
        res.status(404).json({
            success:false,
        })
    }
 


}

    export const login =async (req,res)=>{

        try {
            
            const {email,password}=req.body;
        let user = await User.findOne({email}).select("+password");

        if(!user) return res.json({
            success:false,
            message:"invalid email or password",
        })
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) res.status(404).json({
            success:false,
            message:"invalid email or password",
        })
        sendcookie(user,res,`welcome back ${user.name} `,201)
        } catch (error) {

              res.status(404).json({
            success:false,
        })
        }

        
        

    }
    export const logout = (req,res)=>{
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

        
    }

    export const updateuser =async(req,res)=>{

        try {
            const task = await User.findById(req.user.id);

        task.name=req.body.name;
        task.profilepic=req.body.profilepic;
        task.bio=req.body.bio;

        await task.save();

        res.status(200).json({
            success:true,
            message:"data updated"
        })

        } catch (error) {
            res.status(404).json({
                success:false,})
        }

        
    }

    export const deleteUser =async(req,res,next)=>{

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
            message:"task deleted"
        })
            
        } catch (error) {
            res.status(404).json({
                success:false,})
        }

        
        
    }
    