const mongoose=require('mongoose');
//objectId is the part of mongoose.Schema
const {ObjectId} = mongoose.Schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:8
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    verify:{
        type:Boolean,
        required:true,
        default:false
    },
    reg_date:{
        type:Date,
        required:true,
        default:Date.now
    },
    image:{
        type:String
    }
})
module.exports = mongoose.model('User', userSchema);