const express=require('express');
const Student=require('../models/students');
const route=express.Router();

//add student
route.post('/addStudent',(req,res,next)=>{
    Student.findOne({symbol_no:req.body.symbol_no})
    .then((student)=>{
        if(student==null){
            Student.create(req.body)
            .then((student)=>{
                res.status(201)
                res.json({status:201, message:student})
            }).catch(next)
        }else{
            res.status(402);
            res.json({status:402, message:"Symbol no already exist"})
        }
    }).catch(next)
})
module.exports = route;