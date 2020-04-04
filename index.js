const express=require('express');
const dotenv=require('dotenv').config()
const mongoose=require('mongoose');
const app=express();

//connect to the mongodb database using the defined URL parameter
mongoose.connect(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true, useFindAndModify:false,useCreateIndex:true})
.then((db)=>{
    console.log("Successfully connected to Mongodb Server")
},(err)=>console.log(err));

//to start the backend at defined port no
app.listen(process.env.PORT,()=>{
    console.log(`App is running at localhost:${process.env.PORT}`);
})
module.exports = app