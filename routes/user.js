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

module.exports = route;