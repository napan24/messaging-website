import React, { useEffect, useRef, useState } from 'react';
import '../Navbar.css';
import "../home.css";
import axios from 'axios';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
const HomePhone = (props) => {
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [msgDataList, setMsgDataList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (props.data.sender.length > 0 && props.data.reciever.length > 0 && props.data.createdAt.length > 0) {
      if (msgDataList.find(o => o.reciever === reciever) == null) {
        getMsgList();
      }
      else {
        addMsg();
      }
    }
  }, [props.data])
  function addMsg() {
    if (msgDataList.find(o => o.reciever === props.data.reciever) == null) {
      const obj1 = { 'reciever': sender, 'sender': props.data.reciever, message: props.data.msg, createdAt: props.data.createdAt, image: props.data.image }
      const obj = { 'reciever': sender, 'msgList': obj1 }
      const newTodos = [...msgDataList];
      newTodos.push(obj);
      setMsgDataList(newTodos);
    }
    else {
      console.log(props.data);
      const msgs = msgDataList.find(o => o.reciever === props.data.reciever);
      setMsgDataList(msgDataList.filter(o => o.reciever === props.data.reciever));
      const obj = { 'reciever': sender, 'sender': props.data.reciever, 'message': props.data.msg, 'createdAt': props.data.createdAt, 'image': props.data.image }
      msgs.msgList.push(obj);
      console.log(msgs);
      msgDataList.push(msgs);
    }
    userlist();
  }
  const getMsgList = async () => {
    var user = sender;
    var rec = props.reciever1;
    const res = await fetch("/searchmsg", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user, rec })
    });
    const result = await res.json();
    if (msgDataList.find(o => o.reciever === props.reciever1) == null) {
      const obj = { 'reciever': props.reciever1, 'msgList': result.data }
      const newTodos = [...msgDataList];
      newTodos.push(obj);
      setMsgDataList(newTodos);
    }
    addMsg();
  };
  useEffect(() => {
    var profile_obj = localStorage.getItem('profile_data');
    var profile_obj1 = JSON.parse(profile_obj);
    setSender(profile_obj1.username);
    userlist();
  }, [sender])
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  useEffect(() => {
    if (fileName.length > 0) {
      uploadFile();
    }
  }, [fileName]);
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", sender);
    try {
      const res = await axios.post(
        "http://localhost:8000/upload",
        formData
      );
    } catch (ex) {
      console.log(ex);
    }
    profilePhotoUpdate();
  };
  const profilePhotoUpdate = async () => {
    var name = sender + ".jpg";
    const res = await fetch("/updateProfilePhoto", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sender, name })
    });
    const result = await res.json();
    var temp = sender;
    setSender("");
    setSender(temp);
  };
  const userlist = async () => {
    var user = sender;
    const res = await fetch("/searchrecentmsg", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    });
    const result = await res.json();
    setUserList(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    if (reciever.length > 0) {
      getMsg();
    }
  }, [reciever]);
  function getMsg() {
    if (msgDataList.find(o => o.reciever === reciever) == null) {
      getmsg();
    }
    else {
      const msgs = msgDataList.find(o => o.reciever === reciever);
      setMsgList(msgs.msgList);
    }
  }
  const getmsg = async () => {
    var user = sender;
    var rec = reciever;
    const res = await fetch("/searchmsg", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user, rec })
    });
    const result = await res.json();
    if (msgDataList.find(o => o.reciever === reciever) == null) {
      const obj = { 'reciever': reciever, 'msgList': result.data }
      const newTodos = [...msgDataList];
      newTodos.push(obj);
      setMsgDataList(newTodos);
    }
    setMsgList(result.data);
  };
  function func(user) {
    setReciever(user.reciever);
    updateUnread(user);
  }
  const updateUnread = async (user) => {
    if (user.unread == 0) {
      return;
    }
    var rec = user.reciever;
    const res = await fetch("/updateUnread", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sender, rec })
    });
    const result = await res.json();
    userlist();
  };
  function closeChat() {
    setReciever("");
  };
  function handleMouseIn(e) {
    e.target.style.backgroundColor = '#f0f2f5';
  };
  function handleMouseOut(e) {
    e.target.style.backgroundColor = 'white';
  };
  function changeRec(data) {
    setReciever(data.username);
  }
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
  function timeToIst(str) {
    var s = new Date(str).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
    return s;
  }
  function logOutButtonPopUpFunc(id) {
    if (document.getElementById(id).style.display == "inline-block") {
      document.getElementById(id).style.display = "none";
    }
    else {
      document.getElementById(id).style.display = "inline-block";
    }
  }
  const deleteChat = async () => {
    setMsgDataList(msgDataList.filter(o => o.reciever !== reciever));
    setMsgList([]);
    const res = await fetch("/deleteChat", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reciever, sender })
    });
    const result = await res.json();
    userlist();
    closeChat();
  };
  function saveFileChat(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    uploadImageChat(file);
  }
  const uploadImageChat = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("fileName", imageFile.name);
    try {
      const res = await axios.post(
        "http://localhost:8000/uploadImage",
        formData
      );
    } catch (ex) {
      console.log(ex);
    }
    profileImageChat(imageFile.name);
  };
  const profileImageChat = async (imageFile) => {
    const res = await fetch("/uploadChatImage", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sender, reciever, imageFile })
    });
    const result = await res.json();
    props.socket.emit("sendMessage", {
      username: sender,
      reciever: reciever,
      msg: "",
      image: imageFile
    })
    if (msgDataList.find(o => o.reciever === reciever) == null) {
      getmsg();
    }
    else {
      const msgs = msgDataList.find(o => o.reciever === reciever);
      setMsgDataList(msgDataList.filter(o => o.reciever === reciever));
      var today = new Date();
      if (today.getHours() > 12) {
        if (today.getHours() - 12 < 10) {
          if (today.getMinutes() < 10) {
            var time = "0" + (today.getHours() - 12) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
          else {
            var time = "0" + (today.getHours() - 12) + ':' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
        }
        else {
          if (today.getMinutes() < 10) {
            var time = (today.getHours() - 12) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
          else {
            var time = (today.getHours() - 12) + ':' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
        }
      }
      else {
        if (today.getHours() < 10) {
          if (today.getMinutes() < 10) {
            var time = "0" + (today.getHours()) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
          else {
            var time = "0" + (today.getHours()) + ':' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
        }
        else {
          if (today.getMinutes() < 10) {
            var time = (today.getHours() - 12) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
          else {
            var time = (today.getHours() - 12) + ':' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
        }
      }
      const obj = { 'reciever': reciever, 'sender': sender, message: "", createdAt: time, image: imageFile }
      msgs.msgList.push(obj);
      msgDataList.push(msgs);
      setMsgList(msgDataList.find(o => o.reciever === reciever).msgList);
    }
    setMsg("");
  };
  function changeSender(str) {
    setSender(str);
  }
  const msgSubmit = async (e) => {
    e.preventDefault();
    var send = sender;
    var rec = reciever;
    var text = msg;
    const res = await fetch("/sendmsg", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ send, rec, text })
    });
    const result = await res.json();
    props.socket.emit("sendMessage", {
      username: sender,
      reciever: reciever,
      msg: msg,
      image: ""
    })
    if (msgDataList.find(o => o.reciever === reciever) == null) {
      getmsg();
    }
    else {
      const msgs = msgDataList.find(o => o.reciever === reciever);
      setMsgDataList(msgDataList.filter(o => o.reciever === reciever));
      var today = new Date();
      if (today.getHours() > 12) {
        if (today.getHours() - 12 < 10) {
          if (today.getMinutes() < 10) {
            var time = "0" + (today.getHours() - 12) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
          else {
            var time = "0" + (today.getHours() - 12) + ':' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
        }
        else {
          if (today.getMinutes() < 10) {
            var time = (today.getHours() - 12) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
          else {
            var time = (today.getHours() - 12) + ':' + today.getMinutes() + ':' + today.getSeconds() + "pm";
          }
        }
      }
      else {
        if (today.getHours() < 10) {
          if (today.getMinutes() < 10) {
            var time = "0" + (today.getHours()) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
          else {
            var time = "0" + (today.getHours()) + ':' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
        }
        else {
          if (today.getMinutes() < 10) {
            var time = (today.getHours() - 12) + ':0' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
          else {
            var time = (today.getHours() - 12) + ':' + today.getMinutes() + ':' + today.getSeconds() + "am";
          }
        }
      }
      const obj = { 'reciever': reciever, 'sender': sender, message: msg, createdAt: time, 'image': "" }
      msgs.msgList.push(obj);
      msgDataList.push(msgs);
      setMsgList(msgDataList.find(o => o.reciever === reciever).msgList);
    }
    userlist();
  }
  return (
    <>
      <div style={{ display: "flex", overflow: "hidden" }}>
        {reciever.length > 0 ?
          <RightSection
          width={props.width}
            userList={userlist} activeUsers={props.activeUsers}
            reciever={reciever} handleMouseOut={handleMouseOut}
            handleMouseIn={handleMouseIn} titleCase={titleCase}
            logOutButtonPopUpFunc={logOutButtonPopUpFunc} closeChat={closeChat}
            msgList={msgList} timeToIst={timeToIst} setMsg={setMsg}
            saveFileChat={saveFileChat} msg={msg} msgSubmit={msgSubmit}
            deleteChat={deleteChat} sender={sender} /> :
          <LeftSection changeSender={changeSender} changeRec={changeRec}
            logOutButtonPopUpFunc={logOutButtonPopUpFunc}
            saveFile={saveFile} handleMouseOut={handleMouseOut}
            sender={sender} titleCase={titleCase} handleMouseIn={handleMouseIn}
            userList={userList} timeToIst={timeToIst} func={func}></LeftSection>
        }
      </div>
    </>
  )
}

export default HomePhone