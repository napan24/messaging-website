import { Navbar } from './Navbar'
import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import HomePhone from './Phone/HomePhone';
const socket = io();
export const Home = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [activeUsers, setActiveUsers] = useState([]);
    const [reciever1, setReciever1] = useState("");
    const [data, setData] = useState({ sender: "", reciever: "", msg: "", createdAt: "", image: "" })
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
    useEffect(()=>{
        console.log(windowDimensions);
    },[windowDimensions]);
    useEffect(() => {
        handleResize(); 
        var profile_obj = localStorage.getItem('profile_data');
        var profile_obj1 = JSON.parse(profile_obj);
        socket.emit("addUser", profile_obj1.username);
        socket.on("getUsers", users => {
            setActiveUsers(users);
        })
        socket.on("getMessage", (data) => {
            var username = data.username;
            setReciever1(username);
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
            setData({ sender: data.reciever, reciever: data.username, msg: data.msg, createdAt: time, image: data.image });
        })
    }, [])
    return (
        windowDimensions.width<800?<HomePhone width={windowDimensions.width} data={data} reciever1={reciever1} activeUsers={activeUsers} socket={socket}></HomePhone>:
        <Navbar data={data} reciever1={reciever1} activeUsers={activeUsers} socket={socket}></Navbar>
    )
}
