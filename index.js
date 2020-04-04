const express=require('express');
const dotenv=require('dotenv').config()
const app=express();



//to start the backend at defined port no
app.listen(process.env.PORT,()=>{
    console.log(`App is running at localhost:${process.env.PORT}`);
})
module.exports = app