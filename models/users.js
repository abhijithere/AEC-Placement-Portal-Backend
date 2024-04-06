import mongoose from "mongoose";

const userschema= new mongoose.Schema({
  name:{
    type:String,
    required: true,
},
studentid:{
  type:String,
  unique:true,
  required: true,
},
email:{
    type:String,
    unique:true,
    required: true,
},
password : {
  type:String,
  select:true,
  required: true,
},
department:{
  type:String,
  required:true,
},
  })
  
 export const User =  mongoose.model("User",userschema);