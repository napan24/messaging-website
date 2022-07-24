const mongoose=require('mongoose');
const users=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true
    }
});
const scheme=mongoose.model('USERS',users);
module.exports=scheme;