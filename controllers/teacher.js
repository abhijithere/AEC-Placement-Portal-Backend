import { Teacher } from "../models/teacher.js";
import { sendcookie } from "../utils/features.js";
import { User } from "../models/users.js"; 
import bcrypt from "bcrypt"
import { asyncerror } from "../middleware/catchAsyncError.js";

// getSinglestudent,updatestudent,deletestudent

export const getSinglestudent = asyncerror(async(req,res,next)=>{


    const user = await User.findById(req.params.id);

if(!user){
    return next(new ErrorHandler("student does't exist",400));

}

    res.status(200).json({
        success:true,
        user,
    })

})


export const updatestudent = asyncerror(async(req,res,next)=>{

    
    const newUserdata ={
        name:req.body.name,
        email:req.body.email,
        department:req.body.department,
    }


    //

    const user = await User.findByIdAndUpdate(req.params.id,newUserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"profile updated successfully"

    })
})
// Delete user (admin) : --------------------------------

export const deletestudent = asyncerror(async(req,res,next)=>{

    
    const user = await User.findById(req.params.id)
  
    if(!user){
        return next(new ErrorHandler("User does't exist",400));
    
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message:"profile deleted successfully"

    })
})




/////////////////////////////////////
export const getallstudent = asyncerror(
    async (req,res)=>{

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
)  

////////

export const getSingleUser = asyncerror(async(req,res,next)=>{


    const user = await Teacher.findById(req.params.id);

if(!user){
    return next(new ErrorHandler("Teacher does't exist",400));

}

    res.status(200).json({
        success:true,
        user,
    })

})


// update user role (admin) : --------------------------------

export const updateUserRole = asyncerror(async(req,res,next)=>{

    
    const newUserdata ={
        name:req.body.name,
        email:req.body.email,
        department:req.body.department,
        role:req.body.role,
    }


    //

    const user = await Teacher.findByIdAndUpdate(req.params.id,newUserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"profile updated successfully (admin)"

    })
})
// Delete user (admin) : --------------------------------

export const deleteUserProfile = asyncerror(async(req,res,next)=>{

    
    const user = await Teacher.findById(req.params.id)
  
    if(!user){
        return next(new ErrorHandler("User does't exist",400));
    
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message:"profile deleted successfully"

    })
})






///////

export const getallusers = asyncerror(

    async (req,res)=>{

        try {
            const users = await Teacher.find({});
    
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
) 

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

        const {name,teacherid,email,department,password} = req.body;
        let user = await Teacher.findOne({teacherid})
    
        if(user) return res.status(404).json({
            success:false,
            message:"Teacher already exist",
        })
        const hashedpassword = await bcrypt.hash(password,10);
        user = await Teacher.create({name,teacherid,email,department,password:hashedpassword})
    
        sendcookie(user,res,"registered successfully",201)
        
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
        })
    }
 


}

    export const login = asyncerror(
        async (req,res)=>{

            try {
                
                const {teacherid,password}=req.body;
            let user = await Teacher.findOne({teacherid}).select("+password");
    
            if(!user) return res.json({
                success:false,
                message:"invalid teacherid or password",
            })
            
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) res.status(404).json({
                success:false,
                message:"invalid teacherid or password",
            })
            sendcookie(user,res,`welcome back ${user.name} `,201)
            } catch (error) {
    
                  res.status(404).json({
                success:false,
            })
            }
    
            
            
    
        }
    ) 



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
            const task = await Teacher.findById(req.user.id);

        task.name=req.body.name;
        task.email=req.body.email;
        task.department=req.body.department;
        
        await task.save();

        res.status(200).json({
            success:true,
            message:"Teacher details updated"
        })

        } catch (error) {
            res.status(404).json({
                success:false,})
        }

        
    }

    export const deleteUser =async(req,res,next)=>{

        try {

            const task = await Teacher.findById(req.params.id);
        console.log(task)
        
        if(!task) return res.status(404).json({
            success:false,
            message:"invalid id"
        })
        
        await task.deleteOne();
    
        res.status(200).json({
            success:true,
            message:"Teacher deleted"
        })
            
        } catch (error) {
            res.status(404).json({
                success:false,})
        }        
        
    }
    