const dotenv = require('dotenv');
const port = process.env.PORT || 8000;
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const mongoose = require('mongoose');
const path = require('path')
const express = require('express');
const app = express();
app.use(express.json());
//socket io
server=app.listen(process.env.PORT || 8000, () => {
    console.log("server at port 8000");
});
let usera=[];
const addUser=(username,socketId)=>{
    !usera.some(usera=>usera.username===username)&&usera.push({username,socketId});
}
const removeUser=(socketId)=>{
    usera=usera.filter((usera)=>usera.socketId!==socketId);
}
const getUsername=(username)=>{
    return usera.find(usera=>usera.username===username);
}
const getUsernameFromId=(Id)=>{
    return usera.find(usera=>usera.socketId===Id);
}
const io=require('socket.io')(server,{
    cors:{
        origin:"https://messaging-website.herokuapp.com/"
    }
});
io.on("connection",(socket)=>{
    console.log('connected');
    socket.on("addUser",username=>{
        addUser(username,socket.id);
        io.emit("getUsers",usera);
    })
    socket.on("sendMessage",({username,reciever,msg,image})=>{
        const user=getUsername(reciever);
        if(user==null){
            return;
        }
        var today = new Date();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        io.to(user.socketId).emit("getMessage",{
            username,
            msg,
            reciever,
            time,
            image
        })
    })
    socket.on("disconnect",()=>{
        const user=getUsernameFromId(socket.id);
        console.log("disconnected");
        console.log(user);
        removeUser(socket.id);
        io.emit("getUsers",usera);
    });
});
const msg = require('./model/msg');
const users = require('./model/user');
const msglist = require('./model/msglist');
dotenv.config({ path: './config.env' });
const db = process.env.DB;
mongoose.connect(db, { useNewUrlParser: true })
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/upload", (req, res) => {
    const newpath = __dirname + "/client/public/profile_image/";
    const file = req.files.file;
    const filename = req.body.fileName+".jpg";
    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            res.status(500).send({ message: "File upload failed", code: 200 });
        }
        else{
            res.status(200).send({ message: "File Uploaded", code: 200 });
        }
    });
});
app.post("/uploadImage", (req, res) => {
    const newpath = __dirname + "/client/src/components/chatImages/";
    const file = req.files.file;
    const fileName=file.name;
    file.mv(`${newpath}${fileName}`, (err) => {
        if (err) {
            res.status(500).send({ message: "File upload failed", code: 200 });
        }
        else{
            res.status(200).send({ message: "File Uploaded", code: 200 });
        }
    });
});
app.post('/uploadChatImage', (req, res) => {
    const { sender, reciever,imageFile} = req.body;
    const data = new msg({
        reciever: reciever,
        sender: sender,
        image:imageFile
    });
    msglist.findOneAndUpdate(
        { "user": sender, "reciever": reciever },
        { "$set": { "msg": "image"} },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    msglist.findOneAndUpdate(
        { "user": reciever, "reciever": sender },
        { "$set": { "msg": "image" },$inc: {'unread': 1 } },
        { "new": true, "upsert": true },
        function (err, doc) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    data.save();
    return res.json({ message: "Success" });
});
app.post('/searchuser', (req, res) => {
    const { name } = req.body;
    console.log(name)
    users.find({username: new RegExp(name, 'i') },
        function (err, person) {
            if (err) return handleError(err);
            console.log(person);
            res.json({ data: person });
        });
})
app.post('/deleteChat', (req, res) => {
    const { sender,reciever } = req.body;
    msg.deleteMany({$or: [{ reciever: reciever, sender: sender }, { reciever: sender, sender: reciever }] }, function(err) {
        console.log(err);
    })
    msglist.deleteMany({$or: [{ reciever: reciever, sender: sender }, { reciever: sender, sender: reciever }] }, function(err) {
        console.log(err);
    })
    return res.json({message:'success'});
})
app.post('/updateProfilePhoto', (req, res) => {
    const { sender,name } = req.body;
    users.findOneAndUpdate(
        { "username": sender },
        { "$set": { "profile_picture": name } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    return res.json({message:"success"});
})
app.post('/updateUnread', (req, res) => {
    const { sender, rec } = req.body;
    msglist.findOneAndUpdate(
        { "user": sender, "reciever": rec },
        { "$set": { "unread": 0}},
        { "new": true, "upsert": true },
        function (err, doc) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    return res.json({ message: "Success" });
});
app.post('/sendmsg', (req, res) => {
    const { send, rec, text } = req.body;
    const data = new msg({
        reciever: rec,
        sender: send,
        message: text
    });
    msglist.findOneAndUpdate(
        { "user": send, "reciever": rec },
        { "$set": { "msg": text} },
        { "new": true, "upsert": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    msglist.findOneAndUpdate(
        { "user": rec, "reciever": send },
        { "$set": { "msg": text},$inc: {'unread': 1 }},
        { "new": true, "upsert": true },
        function (err, doc) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    data.save();
    return res.json({ message: "Success" });
});
app.post('/updatename', (req, res) => {
    const { profilename, sender } = req.body;
    var username = sender;
    users.findOneAndUpdate(
        { "username": username },
        { "$set": { "username": profilename } },
        { "new": true },
        function (err) {
            if (err) { // err: any errors that occurred
                console.log(err);
            }
        })
    msglist.updateMany({ user: username },
        { user: profilename }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
    msglist.updateMany({ reciever: username },
        { reciever: profilename }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
    msg.updateMany({ reciever: username },
        { reciever: profilename }, function (err, docs) {
            if (err) {
                console.log(err)
            }

            else {
                console.log(docs);
            }
        });
    msg.updateMany({ sender: username },
        { sender: profilename }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(docs);
            }
        });
    return res.json({ message: "Success" });
});
app.post('/searchmsg', (req, res) => {
    const { user, rec } = req.body;
    msg.find({ $or: [{ reciever: rec, sender: user }, { reciever: user, sender: rec }] },
        function (err, person) {
            if (err) return handleError(err);
            res.json({ data: person });
        });
});
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    users.findOne({ username: username, password: password }, { password:0,_id:0 })
        .then((exist) => {
            if (exist) {
                return res.json({ data: exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
});
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    users.findOne({ username: username })
        .then((exist) => {
            if (exist) {
                return res.json({ error: "Email Exist" });
            }
            else {
                const data = new users({
                    username: username,
                    email: email,
                    password: password
                })
                data.save();
                return res.json({ message: "Success" });
            }
        })
});
app.post('/searchrecentmsg', (req, res) => {
    const { user } = req.body;
    msglist.find({ user: user }, { msg: 1, reciever: 1 ,updatedAt:1,unread:1})
        .sort({ 'updatedAt': -1 })
        .then((exist) => {
            if (exist) {
                return res.json({ data: exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
});
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});