import React, { useState, useEffect } from 'react'
import "./home.css"
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BsSearch } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const LeftSection = (props) => {
    const [userSearch, setUserSearch] = useState("");
    const [profilePageToggle, setProfilePageToggle] = useState(true);
    const [profilename, setProfilename] = useState("");
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [filterUnread, setFilterUnread] = useState(false);
    function onChangeUserSearch(e) {
        setUserSearch(e.target.value);
    }
    function handleMouseInUserList(e) {
        if (e.target.className == "userList") {
            e.target.style.backgroundColor = '#f0f2f5';
            e.target.querySelector('.userListUnread').style.backgroundColor = '#25d366';
            e.target.querySelector('.userListTime').style.backgroundColor = '#f0f2f5';
            e.target.querySelector('.userListName').style.backgroundColor = '#f0f2f5';
            e.target.querySelector('.userListMsg').style.backgroundColor = '#f0f2f5';
        }
    };
    function handleMouseOutUserList(e) {
        if (e.target.className == "userList") {
            e.target.style.backgroundColor = 'white';
            e.target.querySelector('.userListUnread').style.backgroundColor = '#25d366';
            e.target.querySelector('.userListTime').style.backgroundColor = 'white';
            e.target.querySelector('.userListName').style.backgroundColor = 'white';
            e.target.querySelector('.userListMsg').style.backgroundColor = 'white';
        }
    };
    function handleMouseInNavbarOptions(e) {
        if (e.target.className == "OptionsNavbarLeftSection") {
            e.target.style.backgroundColor = '#f0f2f5';
            e.target.querySelector('.LogOutNavbarLeftSection').style.backgroundColor = '#f0f2f5';
        }
    };
    function handleMouseOutNavbarOptions(e) {
        if (e.target.className == "OptionsNavbarLeftSection") {
            e.target.style.backgroundColor = 'white';
            e.target.querySelector('.LogOutNavbarLeftSection').style.backgroundColor = 'white';
        }
    };
    useEffect(() => {
        if (userSearch.length > 0) {
            finduser();
        }
        else {
            setUserSearchResults([]);
        }
    }, [userSearch]);
    const finduser = async () => {
        var name = userSearch;
        console.log(name);
        const res = await fetch("/searchuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });
        const result = await res.json();
        var data = result.data;
        var remove_user = data.filter((data) => data.username !== props.sender);
        console.log(data);
        setUserSearchResults(remove_user);
    };
    useEffect(() => {
        var profile_obj = localStorage.getItem('profile_data');
        var profile_obj1 = JSON.parse(profile_obj);
        setProfilename(profile_obj1.username);
    }, [props.sender]);
    function changeProfileName(e) {
        setProfilename(e.target.value);
    }
    function changeName() {
        updateName();
    }
    const updateName = async () => {
        const sender = props.sender;
        const res = await fetch("/updatename", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ profilename, sender })
        });
        const result = await res.json();
        temp();
    };
    function temp() {
        var a;
        var profile_obj = localStorage.getItem('profile_data');
        var profile_obj1 = JSON.parse(profile_obj);
        a = profile_obj1;
        a.username = profilename;
        localStorage.setItem('profile_data', JSON.stringify(a));
        props.changeSender(profilename);
    }
    return (
        <>
            {profilePageToggle ?
                <div className='left-container'>
                    <div id='logOutButtonPopUp' style={{ display: "none", position: "absolute", backgroundColor: "white", color: "grey", zIndex: "2", left: "19vw", top: "9vh", display: "none" }}>
                        <div className='OptionsNavbarLeftSection' onMouseOver={handleMouseInNavbarOptions} onMouseOut={handleMouseOutNavbarOptions} style={{ boxShadow: "-0.5px 0.5px 0.5px 0.5px #888888", width: "15vw", height: "7vh", position: "relative" }}>
                            <span className='LogOutNavbarLeftSection' style={{ position: "absolute", left: "10%", top: "12%", fontSize: "120%", fontWeight: "350", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>
                                Log out
                            </span>
                        </div>
                    </div>
                    <nav className="navbar" style={{ backgroundColor: "#f0f2f5", width: "35vw", position: "relative", height: "12vh" }}>
                        <img className='profileImageTopLeft' src={"profile_image/" + props.sender + ".jpg"} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "profile_image/default_user.jpg";
                        }} onClick={() => { setProfilePageToggle(false) }} style={{ position: "absolute", borderRadius: "50%" }}></img>
                        <svg className='filterButtonTopLeft' onClick={() => { setFilterUnread(!filterUnread) }} viewBox="0 0 24 24" style={{ position: "absolute", color: "#54656f",right:"10vw",height:"1.8vw",width:"1.8vw",top:"3.5vh" }} height="20" width="20" preserveAspectRatio="xMidYMid meet" class=""><path fill="currentColor" d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"></path></svg>
                        <svg className='chatButtonTopLeft' viewBox="0 0 24 24" style={{ color: "#54656f", position: "absolute" }}><path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
                        <FontAwesomeIcon className='optionButtonTopLeft' onClick={() => { props.logOutButtonPopUpFunc('logOutButtonPopUp') }} icon={faEllipsisV} style={{ position: "absolute", color: "#54656f", cursor: "pointer" }} />
                    </nav>
                    <div className="input-group" style={{ height: "7vh", width: "35vw" }}>
                        <BsSearch style={{ width: "10%", height: "50%", position: "absolute", top: "20%" }}></BsSearch>
                        <input className='userSearchBarTopLeft' type="text" onChange={onChangeUserSearch} placeholder="Search Username To Chat" aria-label="Username" aria-describedby="basic-addon1" style={{ position: "absolute", right: "0", borderColor: "transparent", border: "none", outline: 'none', outlineColor: "transparent", width: "90%", backgroundColor: "#f0f2f5", paddingLeft: "1vw", height: "80%", marginTop: "0.75vh", borderRadius: "15px" }} />
                    </div>
                    <div style={{ position: "absolute", top: "19vh", width: "35vw", zIndex: "2" }}>
                        {
                            userSearchResults.map((user) => (
                                <div key={user.username} onClick={() => { props.changeRec(user) }} onMouseOver={props.handleMouseIn} onMouseOut={props.handleMouseOut} className="userresults" style={{ backgroundColor: "#f0f2f5", zIndex: "2", height: "10vh", color: "white", borderBottom: "1px solid grey", cursor: "pointer" }}>
                                    <div>
                                        <img src={"profile_image/" + user.profile_picture + ".jpg"} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "profile_image/default_user.jpg";
                                        }} style={{ marginLeft: "0.5vw", width: "8vh", height: "8vh", borderRadius: "50%", position: "absolute", marginTop: "0.5vh" }}></img>
                                        {/* <FontAwesomeIcon icon={faCircleUser} style={{ color: "black", height: "85%", position: "absolute", marginTop: "0.7vh" }} /> */}
                                    </div>
                                    <div className="sidebar_name" style={{ position: "absolute", left: "5.5vw", marginTop: "1vh" }}>
                                        <h6 style={{ color: "#111b21", position: "absolute", fontSize: "3vh", overflow: "hidden", fontWeight: "300" }}>{props.titleCase(user.username)}</h6>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div style={{ width: "35vw", height: "81vh", overflowY: "scroll", backgroundColor: "white" }}>
                        {filterUnread?
                        props.userList.filter(user=>user.unread>0).map((user) => (
                            <>
                                <div key={user.reciever} className='userList' onMouseOver={handleMouseInUserList} onMouseOut={handleMouseOutUserList} onClick={() => { props.func(user) }} style={{ width: "34.5vw", height: "10vh", color: "#111b21", backgroundColor: "white", borderBottom: "1px solid #e9edef", position: "relative", cursor: "pointer" }}>
                                    <div>
                                        <img className='userListImage' src={"profile_image/" + user.reciever + ".jpg"} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "profile_image/default_user.jpg";
                                        }} style={{ borderRadius: "50%", position: "absolute" }}></img>
                                        {/* <FontAwesomeIcon icon={faCircleUser} style={{ color: "black", height: "85%", position: "absolute", marginTop: "0.7vh" }} /> */}
                                    </div>
                                    <div className="sidebar_name" style={{ position: "absolute", left: "5.5vw", marginTop: "1vh" }}>
                                        <h6 className="userListName" style={{ color: "#111b21", position: "absolute", overflow: "hidden", backgroundColor: "white", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>{props.titleCase(user.reciever)}</h6>
                                        <span className="userListMsg" style={{ width: "25vw", height: "4vh", position: "absolute", color: "#667781", overflowY: "hidden", fontWeight: "300" }}>{props.titleCase(user.msg)}</span>
                                    </div>
                                    <span className="userListTime" style={{ color: "#667781", position: 'absolute' }}>
                                        {props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 1, props.timeToIst(user.updatedAt).indexOf(",") + 6) + " " + props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 10, props.timeToIst(user.updatedAt).indexOf(",") + 13).toLowerCase()}
                                    </span>
                                    <span className="userListUnread" style={{ display: user.unread == 0 ? "none" : "flex", textAlign: "center", borderRadius: "50px", color: "white", position: 'absolute', backgroundColor: "#25d366" }}>
                                        <p className="userListUnreadNumber" style={{ marginLeft: 'auto', marginRight: "auto", position: "relative", transform: "translateY(-50%)" }}>
                                            {user.unread}
                                        </p>
                                    </span>
                                </div>
                            </>
                        ))
                        :props.userList.map((user) => (
                            <>
                                <div key={user.reciever} className='userList' onMouseOver={handleMouseInUserList} onMouseOut={handleMouseOutUserList} onClick={() => { props.func(user) }} style={{ width: "34.5vw", height: "10vh", color: "#111b21", backgroundColor: "white", borderBottom: "1px solid #e9edef", position: "relative", cursor: "pointer" }}>
                                    <div>
                                        <img className='userListImage' src={"profile_image/" + user.reciever + ".jpg"} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "profile_image/default_user.jpg";
                                        }} style={{ borderRadius: "50%", position: "absolute" }}></img>
                                        {/* <FontAwesomeIcon icon={faCircleUser} style={{ color: "black", height: "85%", position: "absolute", marginTop: "0.7vh" }} /> */}
                                    </div>
                                    <div className="sidebar_name" style={{ position: "absolute", left: "5.5vw", marginTop: "1vh" }}>
                                        <h6 className="userListName" style={{ color: "#111b21", position: "absolute", overflow: "hidden", backgroundColor: "white", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>{props.titleCase(user.reciever)}</h6>
                                        <span className="userListMsg" style={{ width: "25vw", height: "4vh", position: "absolute", color: "#667781", overflowY: "hidden", fontWeight: "300" }}>{props.titleCase(user.msg)}</span>
                                    </div>
                                    <span className="userListTime" style={{ color: "#667781", position: 'absolute' }}>
                                        {props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 1, props.timeToIst(user.updatedAt).indexOf(",") + 6) + " " + props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 10, props.timeToIst(user.updatedAt).indexOf(",") + 13).toLowerCase()}
                                    </span>
                                    <span className="userListUnread" style={{ display: user.unread == 0 ? "none" : "flex", textAlign: "center", borderRadius: "50px", color: "white", position: 'absolute', backgroundColor: "#25d366" }}>
                                        <p className="userListUnreadNumber" style={{ marginLeft: 'auto', marginRight: "auto", position: "relative", transform: "translateY(-50%)" }}>
                                            {user.unread}
                                        </p>
                                    </span>
                                </div>
                            </>
                        ))}
                    </div>
                </div> :
                <div className='my-node' style={{ width: "35vw", height: "100vh" }}>
                    <div />
                    <nav className="navbar" style={{ backgroundColor: "#008069", width: "35vw", position: "relative", height: "12vh" }}>
                        <BiArrowBack className='backButtonProfilePage' onClick={() => { setProfilePageToggle(true) }} style={{ color: "white", position: "absolute" }}></BiArrowBack>
                        <span className='topLeftProfileWrittenProfilePage' style={{ color: "white", position: "absolute" }}>Profile</span>
                    </nav>
                    <div style={{ height: "88vh", width: "35vw", overflowY: "scroll", backgroundColor: "rgb(240, 242, 245)" }}>
                        <div className="image-upload">
                            <label for="file-input">
                                <img className='profileImageProfilePage' src={"profile_image/" + props.sender + ".jpg"} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "profile_image/default_user.jpg";
                                }} style={{ borderRadius: "50%", position: "relative" }}></img>
                            </label>
                            <input id="file-input" type="file" onChange={props.saveFile} />
                        </div>
                        <div style={{ width: "34.5vw", height: "15vh", backgroundColor: "white", position: "relative", top: "10vh" }}>
                            <div className='profilePageNameWritten' style={{ position: "absolute", color: "#008069", left: "5%", top: "10%" }}>
                                Your Name
                            </div>
                            <div className='profilePageName' style={{ position: "absolute", left: "5%", top: "50%" }}>
                                <input value={props.titleCase(profilename)} onChange={changeProfileName} type="text" style={{ width: "27vw", outlineColor: "transparent", borderColor: "transparent" }} placeholder="Enter Username" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <AiFillCheckCircle className='profilePageNameSaveButton' onClick={changeName} style={{ color: "#54656f", position: "absolute" }}></AiFillCheckCircle>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default LeftSection;