import mongoose from "mongoose";


const teacherschema= new mongoose.Schema({
  name:{
    type: String,
    required: true,
},
teacherid:{
  type:String,
  unique: true,
  required: true,
},

email:{
  type: String,
  unique: true,
  required: true,
},
department:{
    type:String,
    required: true,
},
password : {
    type:String,
    required: true,
    select: false,
    minLength: [6, "Password too short"],
},
role:{
  type:String,
  default:"Teacher",
},

  })
  mongoose.models = {};
 export const Teacher =  mongoose.model("Teacher",teacherschema);