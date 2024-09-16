const express=require('express');
const multer = require('multer');
let cloudinary=require('cloudinary').v2;
let env=require('dotenv').config();
let route=express.Router();
let {employee}=require('./db.js');
const upload = multer({ dest: 'pictures/' });
cloudinary.config({ 
    cloud_name: process.env.Cloud_name, 
   api_key: process.env.Api_key, 
     api_secret: process.env.Api_secret 
 });
route.get('/',(req,res)=>{
    res.send("HI");
});
route.post('/add',upload.single('avatar'),async (req,res)=>{
    let file=req.file;
    let {name,email,dob,phone}=req.body;
   
   
        let url;
    await cloudinary.uploader.upload(file.path,{resource_type:'image'},
        function(err,result){
            url=result.secure_url;
        });
        let m=await employee.insertMany([{name,email,dob,phone,avatar:url}]);
        if(m){
            res.json({
                ok:true
            })
        }
    })
   route.post('/show', async (req,res)=>{
     let {email,phone,dob,name}=req.body;
     let v= await employee.find({$or:[{email},{phone},{dob},{name}]});
     if(v){
        res.json({
            employee:v,
            ok:true
        })
     }
     else{
        res.json({
            ok:false
        })
     }
   })
    route.post('/edit',upload.single('avatar'),async (req,res)=>{
        let file=req.file;
        let {name,phone,email,dob}=req.body;
       
       
            let url;
        await cloudinary.uploader.upload(file.path,{resource_type:'image'},
            function(err,result){
                url=result.secure_url;
            });

            let m=await employee.findOneAndUpdate({email},{$set:{name,dob,phone,email,avatar:url}});
            if(m){
                res.json({
                    ok:true
                })
            }
        })
        route.post('/delet', async (req,res)=>{
            let {email}=req.body;
            let v=await employee.findOneAndDelete({email});
            if(v){
                res.json({
                    ok:true
                })
            }
        })
    route.get('/all',async (req,res)=>{
      let val=await employee.find({});
      res.json({
        val
      });
    })
module.exports={route};