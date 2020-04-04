const express=require('express');
const dotenv=require('dotenv').config()
const mongoose=require('mongoose');
const morgan=require('morgan');
const cors=require('cors');

const app=express();

//for cross origin request
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+ "/public"))
app.use(express.json());
//for api hit logs
app.use(morgan('tiny'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

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