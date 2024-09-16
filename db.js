const mongoose=require('mongoose');
const env=require('dotenv').config();
let url=process.env.DATABASE_URL;
mongoose.connect(url);
let Schema=new mongoose.Schema({
   name:String,
   dob:String,
   phone:Number,
   email:String,
   avatar:String
});
let employee=mongoose.model("Employee",Schema);
module.exports={employee};