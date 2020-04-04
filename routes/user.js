const express=require('express');
const bcrypt=require('bcryptjs');
const jwttoken=require('jsonwebtoken');
const User=require('../models/users');
const route=express.Router();

//register user
route.post('/register',(req,res,next) =>{
    User.findOne({username:req.body.username})
    .then((user)=>{
        if(user==null)
        {
                    let password=req.body.password;
                    bcrypt.hash(password,10,function(err,hash){
                        if(err){
                            res.json({status:401, message:'Error while hasing'})
                        }
                        User.create({
                            username:req.body.username,
                            password:hash,
                            image:req.body.image,
                        }).then((user) =>{
                          
                     let token=jwttoken.sign({_id:user._id}, process.env.SECRET);
                     res.status(201);
                     res.json({code:201 ,status:"Registered!!!!",token:token});
                    }).catch(next)
             });
        }
        else{
            res.status(409);
            res.json({status:402, message:"User already registered with this username"})
        }
    })
    .catch(next)
});


route.post('/login',(req,res,next)=>{

    User.findOne({username:req.body.username})
    .then((user)=>{
        if(user==null)
        {
            res.status(401)
            res.json({code:401,status:'User not registered'})
        }else if(user.verify==false)
        {
            res.status(402)
            res.json({code:402, status:'Your account is not verified'})
        }
        else{
            bcrypt.compare(req.body.password,user.password)
            .then((isMatch)=>{
                if(!isMatch){
                    res.status(403)
            res.json({code:403,status:"Password not valid"})
                }
                let token=jwttoken.sign({_id: user._id}, process.env.SECRET);
                res.status(200);
                res.json({code:200,status:'You have logged!!!', token:token});

            }).catch(next);
        }
    }).catch(next);
});


module.exports = route;