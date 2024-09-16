const express=require('express');
let cors=require('cors');
let env=require('dotenv').config();
let port=process.env.PORT;
let {route}=require('./route')
let app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(route);

app.listen(port,(er)=>{
    console.log("sucess");
})