const mongoose=require('mongoose');

const msg=new mongoose.Schema({
    reciever:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    message:{
        type:String,
        default:""
    },
    image:{
        type:String
    }
},{ timestamps:true});
const scheme=mongoose.model('MSGS',msg);
module.exports=scheme;