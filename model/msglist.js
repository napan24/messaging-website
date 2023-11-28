const mongoose=require('mongoose');
const msglist=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    unread:{
        type:Number,
        default:0
    }
},{ timestamps:true});
const scheme=mongoose.model('MSGLISTS',msglist);
module.exports=scheme;