const express=require('express');
const Student=require('../models/students');
const route=express.Router();

//add student
route.post('/add',(req,res,next)=>{
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

//get all students
route.get("/all", (req,res,next) => {
    Student.find().sort({firstname:'asc'})
    .then(posts => {
        res.status(200)
        res.json({status:200, message:posts})
    })
    .catch(next)
})

//get student by id
route.get('/:id', (req,res,next)=>{
    Student.findById(req.params.id)
    .then((post)=>{
        res.status(200)
        res.json({status:200, message:post})
    }).catch(next)
})
module.exports = route;

