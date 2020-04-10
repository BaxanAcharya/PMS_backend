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
    .then(students => {
        res.status(200)
        res.json({status:200, message:students})
    })
    .catch(next)
})

//get student by id
route.get('/:id', (req,res,next)=>{
    Student.findById(req.params.id)
    .then((student)=>{
        res.status(200)
        res.json({status:200, message:student})
    }).catch(next)
})

//delete student
route.delete('/:id',(req, res, next) => {
    Student.findByIdAndDelete(req.params.id)
        .then((students) => {
            res.status(200)
            res.json({status:200, message:'deleted'});
        }).catch(next);
});

//edit student
route.put('/:id',(req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((student) => {
            res.json(student);
        }).catch(next)
    });

module.exports = route;

