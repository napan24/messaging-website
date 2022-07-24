import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import background from "../img/login_signup/background1.jpg";
import './login.css';
import google_logo from '../img/login_signup/google_logo.svg';
import facebook_logo from '../img/login_signup/facebook_logo.svg';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export const Login = () => {
    const [data,setData]=useState({username:"",password:""});
    const navigate = useNavigate();
    const doStuff = event => navigate('/home', { replace: true });
    const inputChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setData({...data,[name]:value});
    };
    const handleSubmit=async (e) =>{
        e.preventDefault();
        const {username,password}=data;
        const res= await fetch("/signin",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,password})
        });
        const result=await res.json();
        if(result.data){
            localStorage.setItem('profile_data', JSON.stringify(result.data));
            doStuff();
        }
    }
    return (
        <>
            <div className="body" style={{ width: "100vw", height: "100vh", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <form method='POST'>
                    <div className="box" style={{  backgroundColor: "white", width:"70vmin",height:"80vmin", borderRadius: "10px", position: "absolute", left: "0", right: "0", top: "0", bottom: "0", margin: "auto", fontFamily: "Arial, sans-serif" }}>
                        <h3 style={{ fontSize: "7vmin", position: "absolute", left: "33%", top: "3%" }}>
                            Sign In
                        </h3>
                        <div style={{ position: "absolute", top: "25%", left: "8%",fontSize:"3vmin" }}>
                            Username
                        </div>
                        <input type="text" className="fontAwesome" value={data.username} placeholder="Type Your Username" name="username" style={{ position: "absolute", top: "32%", left: "8%",width:"80%",height:"5%",border:"none",borderBottom:"2px solid black",outline:"none",fontSize:"3vmin" }} onChange={inputChange}/>
                        <div style={{ position: "absolute", top: "45%", left: "8%",fontSize:"3vmin"}}>
                            Password
                        </div>
                        <input type="password" placeholder="Type Your Password" value={data.password} name="password" style={{ position: "absolute", top: "52%", left: "8%",width:"80%",height:"5%",border:"none",borderBottom:"2px solid black",outline:"none",fontSize:"3vmin" }} onChange={inputChange}/>
                        <button onClick={handleSubmit} style={{ fontSize:"3vmin",position: "absolute", top: "65%", left: "8%" ,width:"80%",height:"7%",border:"none",backgroundColor:"black",color:"white",borderRadius:"10px"}}>Sign In</button>
                        <div style={{position: "absolute", top: "75%", left: "30%",fontSize:"3vmin"}}>
                            Or Sign Up Using
                        </div>
                        <img src={google_logo} style={{position: "absolute", top: "82%", left: "15%",width:"10%"}}></img>
                        <img src={facebook_logo} style={{position: "absolute", top: "81%", left: "70%",width:"13%"}}></img>
                        <Link to="signup">
                            <button style={{ fontSize:"3vmin",position: "absolute", top: "93%", left: "8%" ,width:"85%",height:"6%",border:"none",backgroundColor:"black",color:"white",borderRadius:"10px"}}>Sign Up</button>
                        </Link>
                    </div>
                </form>
            </div>
    </>
  )
};
