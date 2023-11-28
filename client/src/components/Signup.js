import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import background from "../img/login_signup/background1.jpg";
import './login.css';
import google_logo from '../img/login_signup/google_logo.svg';
import facebook_logo from '../img/login_signup/facebook_logo.svg';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export const Signup = () => {
    const [zIndex,setZIndex]=useState(1);
    const [data,setData]=useState({username:"",password:"",email:"",cpassword:""});
    const inputChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setData({...data,[name]:value});
    };
    const handleSubmit=async (e) =>{
        e.preventDefault();
        const {username,password,email,cpassword}=data;
        if(username.length==0){
            document.getElementById("username_alert").style.display="inline";
            document.getElementById("username_alert").style.zIndex=zIndex;
            setZIndex(zIndex+1);
            return;
        }
        if(email.length==0){
            document.getElementById("email_alert").style.display="inline";
            document.getElementById("email_alert").style.zIndex=zIndex;
            setZIndex(zIndex+1);
            return;
        }
        if(password.length==0){
            document.getElementById("password_alert").style.display="inline";
            document.getElementById("password_alert").style.zIndex=zIndex;
            setZIndex(zIndex+1);
            return;
        }
        if(password!==cpassword){
            document.getElementById("Password_match_alert").style.display="inline";
            document.getElementById("Password_match_alert").style.zIndex=zIndex;
            setZIndex(zIndex+1);
            return;
        }
        const res= await fetch("/register",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,email,password})
        });
        const result=await res.json();
        console.log(result);
        if(result.error){
            document.getElementById("unique_email_alert").style.display="inline";
            document.getElementById("unique_email_alert").style.zIndex=zIndex;
            setZIndex(zIndex+1);
        }
        else{
            document.getElementById("success").style.display="inline";
            document.getElementById("success").style.zIndex=zIndex;
            setZIndex(zIndex+1);
        }
    }
    return (
    <>
    <div class="alert alert-success" id="success" role="alert" style={{position:"absolute",width:"100vw",textAlign:"center",display:"none"}}>
        Successfully Registered
    </div>
    <div class="alert alert-danger" id="username_alert" role="alert" style={{position:"absolute",width:"100vw",textAlign:"center",display:"none"}}>
        Enter Username Correctly
    </div>
    <div class="alert alert-danger" id="email_alert" role="alert" style={{position:"absolute",width:"100vw",textAlign:"center",display:"none"}}>
        Enter Email Correctly
    </div>
    <div class="alert alert-danger" id="password_alert" role="alert" style={{position:"absolute",width:"100vw",textAlign:"center",display:"none"}}>
        Enter Password Correctly
    </div>
    <div class="alert alert-danger" id="unique_email_alert" role="alert" style={{position:"absolute",width:"100vw",textAlign:"center",display:"none"}}>
        Enter Unique Email Id
    </div>
    <div class="alert alert-danger" id="Password_match_alert" role="alert" style={{position:"absolute",width:"100vw",textAlign:"center",display:"none"}}>
        Password Does Not Match
    </div>
            <div className="body" style={{ width: "100vw", height: "100vh", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <form method='POST'>
                    <div className="box" style={{ width: "70vmin", height: "80vmin", backgroundColor: "white", borderRadius: "10px", position: "absolute", left: "0", right: "0", top: "0", bottom: "0", margin: "auto", fontFamily: "Arial, sans-serif" }}>
                        <h3 style={{ fontSize: "7vmin", position: "absolute", left: "33%", top: "3%" }}>
                            Sign Up
                        </h3>
                        <div style={{ position: "absolute", top: "25%", left: "8%" ,fontSize: "3vmin"}}>
                            Username
                        </div>
                        <input type="text" className="fontAwesome" value={data.name} placeholder="Type Your Username" name="username" style={{ position: "absolute", top: "32%", left: "8%",width:"80%",height:"5%",border:"none",borderBottom:"2px solid black",outline:"none",fontSize: "2vmin" }} onChange={inputChange}/>
                        <div style={{ position: "absolute", top: "40%", left: "8%",fontSize: "3vmin" }}>
                            Email
                        </div>
                        <input type="text" className="fontAwesome" value={data.email} placeholder="Type Your Email" name="email" style={{ position: "absolute", top: "47%", left: "8%",width:"80%",height:"5%",border:"none",borderBottom:"2px solid black",outline:"none",fontSize: "2vmin" }} onChange={inputChange}/>
                        <div style={{ position: "absolute", top: "55%", left: "8%",fontSize: "3vmin" }}>
                            Password
                        </div>
                        <input type="password" placeholder="Type Your Password" value={data.password} name="password" style={{ position: "absolute", top: "62%", left: "8%",width:"80%",height:"5%",border:"none",borderBottom:"2px solid black",outline:"none",fontSize: "2vmin" }} onChange={inputChange}/>
                        <div style={{ position: "absolute", top: "70%", left: "8%",fontSize: "3vmin" }}>
                            Confirm Password
                        </div>
                        <input type="password" placeholder="Type Your Password" value={data.cpassword} name="cpassword" style={{ position: "absolute", top: "77%", left: "8%",width:"80%",height:"5%",border:"none",borderBottom:"2px solid black",outline:"none",fontSize: "2vmin" }} onChange={inputChange}/>
                        <Link to="signup">
                        <button onClick={handleSubmit} style={{ position: "absolute", top: "88%", left: "8%" ,width:"80%",height:"7%",border:"none",backgroundColor:"black",color:"white",borderRadius:"10px",fontSize: "3vmin"}}>Sign Up</button>
                        </Link>
                    </div>
                </form>
            </div>
    </>
  )
}
