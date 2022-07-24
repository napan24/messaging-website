import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import img from "../img/user_profile_photo/img.jpg"
import { AiFillCheckCircle } from "react-icons/ai";
export const Profile_page = () => {
    const [profilename,setProfilename]=useState("");
    return (
        <>
            <div style={{ width: "35vw", height: "100vh" }}>
                <nav class="navbar" style={{ backgroundColor: "#008069", width: "35vw", position: "relative", height: "12vh" }}>
                    <BiArrowBack style={{color:"white",height:"45%",width:"10%",position:"absolute",top:"35%"}}></BiArrowBack>
                    <span style={{color:"white",position:"absolute",left:"15%",bottom:"15%",fontSize:"4vh"}}>Profile</span>
                </nav>
                <div style={{height:"88vh",width:"35vw",overflowY:"scroll",backgroundColor:"rgb(240, 242, 245)"}}>
                    <img src={img} style={{width:"20vw",height:"20vw",borderRadius:"50%",marginLeft:"7.5vw",marginTop:"2vw"}}></img>
                    <div style={{width:"34.5vw",height:"15vh",backgroundColor:"white",position:"relative",marginTop:"5vh"}}>
                        <div style={{position:"absolute",color:"#008069",left:"5%",top:"10%"}}>
                            Your Name
                        </div>
                        <div style={{position:"absolute",left:"5%",top:"50%"}}>
                            <input type="text" style={{width:"27vw",outlineColor:"transparent",borderColor:"transparent"}} placeholder="Enter Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <AiFillCheckCircle style={{position:"absolute",left:"88%",top:"50%",width:"2.5vw",height:"2.5vw"}}></AiFillCheckCircle>
                    </div>
                </div>
            </div>
        </>
    )
}
