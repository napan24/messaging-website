import React, { useState, useEffect } from 'react'
import NoReciever from '../NoReciever';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoClose } from "react-icons/io5";
import Picker from 'emoji-picker-react';
import { BsSearch } from "react-icons/bs";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import background from '../../img/background.jpg';
import MsgSection from "../RightSection/MsgSection";
import { BsPaperclip } from "react-icons/bs";
import { BsEmojiLaughing } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import MsgSectionWithContactOpen from '../RightSection/MsgSectionWithContactOpen';
const RightSection = (props) => {
    const [contactPageToggle, setContactPageToggle] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [activeUsers, setActiveUsers] = useState(props.activeUsers);
    const [emojiPickerShow, setEmojiPickerShow] = useState(false);
    const [width,setWidth]=useState();
    function ShowEmojiPicker() {
        setEmojiPickerShow(!emojiPickerShow);
    }
    function handleMouseInNavbarOptions(e) {
        if (e.target.className == "reciever_chat_option") {
            e.target.style.backgroundColor = '#f0f2f5';
            e.target.querySelector('.reciever_chat_options_name').style.backgroundColor = '#f0f2f5';
        }
    };
    function handleMouseOutNavbarOptions(e) {
        if (e.target.className == "reciever_chat_option") {
            e.target.style.backgroundColor = 'white';
            e.target.querySelector('.reciever_chat_options_name').style.backgroundColor = 'white';
        }
    };
    useEffect(() => {
        setActiveUsers(props.activeUsers);
    }, [props.activeUsers])
    function openContactPage() {
        setContactPageToggle(!contactPageToggle)
        document.getElementById('reciever_chat_options').style.display = "none";
    }
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };
    useEffect(() => {
        if (chosenEmoji !== null) {
            addEmoji();
        }
    }, [chosenEmoji])
    function addEmoji() {
        var newStr = props.msg + chosenEmoji.emoji;
        props.setMsg(newStr);
    }
    function msgChange(e) {
        props.setMsg(e.target.value);
    }
    useEffect(()=>{
        setWidth(props.width);
    },[]);
    return (
        <>
            <div className='right-container' style={{ position: "relative" }}>
                <Picker preload={true} pickerStyle={{ position: 'absolute', bottom: "10vh", width: emojiPickerShow ? width>850?"25vw":"50vw" : "0vw", height: emojiPickerShow ? "50vh" : "0", marginLeft: "0.5vw" }} onEmojiClick={onEmojiClick} />
                {props.reciever.length == 0 ?
                    <NoReciever />
                    :
                    contactPageToggle == true ?
                        <>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div>
                                    <div id='reciever_chat_options' style={{ display: "none", position: "absolute", backgroundColor: "white", color: "grey", zIndex: "2", right: "30vw", top: "9vh" }}>
                                        <div className='reciever_chat_option' onClick={props.closeChat} onMouseOver={handleMouseInNavbarOptions} onMouseOut={handleMouseOutNavbarOptions} style={{ cursor: "pointer", boxShadow: "-0.5px 0px 0px 0px #888888", width: "15vw", height: "7vh", position: "relative" }}>
                                            <div className='reciever_chat_options_name' style={{ position: "absolute", left: "10%", top: "15%", fontSize: "110%", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>Close Chat</div>
                                        </div>
                                        <div className='reciever_chat_option' onClick={openContactPage} onMouseOver={handleMouseInNavbarOptions} onMouseOut={handleMouseOutNavbarOptions} style={{ cursor: "pointer", borderTop: "1px solid #e9edef", boxShadow: "-0.5px 0px 0px 0px #888888", width: "15vw", height: "7vh", position: "relative" }}>
                                            <div className='reciever_chat_options_name' style={{ position: "absolute", left: "10%", top: "15%", fontSize: "110%", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>Contact Info</div>
                                        </div>
                                        <div className='reciever_chat_option' onMouseOver={handleMouseInNavbarOptions} onMouseOut={handleMouseOutNavbarOptions} style={{ cursor: "pointer", borderTop: "1px solid #e9edef", boxShadow: "-0.5px 0px 0px 0px #888888", width: "15vw", height: "7vh", position: "relative" }}>
                                            <div className='reciever_chat_options_name' style={{ position: "absolute", left: "10%", top: "15%", fontSize: "110%", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>Delete Chat</div>
                                        </div>
                                    </div>
                                    <nav className="navbar" style={{ backgroundColor: "#f0f2f5", width: "71vw", position: "relative", height: "12vh" }}>
                                        <img className='recieverProfilePhotoWithContactOpen' src={"profile_image/" + props.reciever + ".jpg"} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "profile_image/default_user.jpg";
                                        }} style={{ borderRadius: "50%", position: "absolute" }}></img>
                                        {activeUsers.some(activeUsers => activeUsers.username === props.reciever) && <div className='active-userWithContactOpen' style={{ color: "green", position: "absolute" }}>Online</div>}
                                        {!activeUsers.some(activeUsers => activeUsers.username === props.reciever) && <div className="talking_nameOfflineWithContactOpen" style={{ color: "#111b21", letterSpacing: "1.10px", position: "absolute", fontWeight: "350", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>
                                            {props.titleCase(props.reciever)}
                                        </div>}
                                        {activeUsers.some(activeUsers => activeUsers.username === props.reciever) && <div className="talking_name" style={{ color: "#111b21", letterSpacing: "1.10px", position: "absolute", fontWeight: "350", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>
                                            {props.titleCase(props.reciever)}
                                        </div>}
                                        {/* <FontAwesomeIcon icon={faCircleUser} style={{ position: "absolute", left: "2%", color: "white", height: "70%" }} /> */}
                                        <BsSearch className='recieverSearchWithContactOpen' style={{ color: "#54656f", position: "absolute" }} />
                                        <FontAwesomeIcon className='optionsButtonWithContactOpen' onClick={() => { props.logOutButtonPopUpFunc('reciever_chat_options') }} icon={faEllipsisV} style={{ cursor: "pointer", position: "absolute", color: "#54656f" }} />
                                    </nav>
                                    <div style={{ width: "71vw", height: "78vh", backgroundImage: "url(" + background + ")", backgroundSize: "contain", overflowY: "scroll", display: "flex", flexDirection: "column-reverse" }}>
                                        <MsgSectionWithContactOpen reciever={props.reciever} msgList={props.msgList} sender={props.sender} titleCase={props.titleCase} timeToIst={props.timeToIst} />
                                    </div>
                                    <nav className="navbar" style={{ backgroundColor: "#f0f2f5", width: "71vw", position: "relative", height: "10vh", display: "inline-block" }}>
                                        <BsEmojiLaughing className='emojiPickerWithContactOpen' onClick={() => { ShowEmojiPicker() }} style={{ color: "#54656f", position: 'absolute' }} />
                                        <label for="file"><BsPaperclip className='attachFilesButtonWithContactOpen' style={{ color: "#54656f", position: "relative" }}></BsPaperclip></label>
                                        <input type="file" onChange={props.saveFileChat} id="file" style={{ display: "none" }} />
                                        <input className='inputWithContactOpen' type="text" value={props.msg} onChange={msgChange} placeholder='Type a message' style={{ height: "80%", width: "70%", borderRadius: "7px", borderColor: "transparent", outline: "none", position: "absolute" }}></input>
                                        <MdSend className='msgSubmitWithContactOpen' onClick={props.msgSubmit} style={{ color: "#54656f", position: "absolute" }}></MdSend>
                                    </nav>
                                </div>
                                <div style={{ width: "29vw", height: "100vh", backgroundColor: "#f0f2f5", overflowX: "scroll" }}>
                                    <nav className="navbar" style={{ backgroundColor: "#f0f2f5", width: "29vw", position: "fixed", height: "12vh" }}>
                                        <IoClose className='closeButtonContactPage' onClick={openContactPage} style={{ color: "#54656f", fontWeight: "400" }}></IoClose>
                                        <div style={{ fontSize: "110%", fontWeight: "400", letterSpacing: "0.75px", wordSpacing: "5px", position: "absolute", left: "20%" }}>
                                            Contact info
                                        </div>
                                    </nav>
                                    <div style={{ height: "67vh", backgroundColor: "white", boxShadow: "1px 2px 2px 1px #888888" }}>
                                        <img className='contactInfoPhoto' src={"profile_image/" + props.reciever + ".jpg"} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "profile_image/default_user.jpg";
                                        }} style={{ borderRadius: "50%", position: "absolute" }}></img>
                                        <div className='contactPageName' style={{ fontWeight: "350", color: "rgb(60 72 79)", position: 'absolute' }}>
                                            {props.titleCase(props.reciever)}
                                        </div>
                                    </div>
                                    <div style={{ width: "28.5vw", marginTop: "2vh", backgroundColor: "white", boxShadow: "1px 2px 2px 1px #888888", display: "inline-block" }}>
                                        <div style={{ color: "#54656f", fontSize: "100%", paddingTop: "5%", marginLeft: "7%" }}>
                                            About
                                        </div>
                                        <div style={{ fontSize: "125%", marginLeft: "7%", paddingBottom: "4%" }}>
                                            For once, be selfish and live for yourself.
                                        </div>
                                    </div>
                                    <div style={{ width: "28.5vw", marginTop: "2vh", backgroundColor: "white", boxShadow: "1px 2px 2px 1px #888888", display: "inline-block" }}>
                                        <div style={{ fontSize: "125%", marginLeft: "5%", paddingBottom: "4%", paddingTop: "2vh" }}>
                                            <svg style={{ color: "red" }} viewBox="0 0 24 24" width="24" height="24" class=""><path fill="currentColor" d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H6v12zM19 3h-3.5l-1-1h-5l-1 1H5v2h14V3z"></path></svg>
                                            <span style={{ marginLeft: "5%", color: "red", fontSize: "90%", wordSpacing: "0.3vw" }}>
                                                Delete chat
                                            </span>
                                        </div>
                                        <div style={{ fontSize: "125%", marginLeft: "5%", paddingBottom: "4%" }}>
                                            <svg viewBox="0 0 24 24" style={{ color: "red" }} width="24" height="24" class=""><path fill="currentColor" d="M12 2.8c-5.3 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7 9.7-4.3 9.7-9.7-4.4-9.7-9.7-9.7zm-7.3 9.7c0-4 3.3-7.3 7.3-7.3 1.6 0 3.1.5 4.3 1.4L6.1 16.8c-.9-1.2-1.4-2.7-1.4-4.3zm7.3 7.3c-1.6 0-3-.5-4.2-1.4L17.9 8.3c.9 1.2 1.4 2.6 1.4 4.2 0 4-3.3 7.3-7.3 7.3z"></path></svg>
                                            <span style={{ marginLeft: "5%", color: "red", fontSize: "90%", wordSpacing: "0.5vw" }}>
                                                Block {" " + props.titleCase(props.reciever)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
                            <div initial={{ x: "64.9vw" }} animate={{ x: "0" }} transition={{ ease: "easeOut", duration: 1 }}>
                                <div>
                                    <div id='reciever_chat_options' style={{ display: "none", position: "absolute", backgroundColor: "white", color: "grey", zIndex: "2", right: "1.5vw", top: "9vh" }}>
                                        <div className='reciever_chat_option' onMouseOver={handleMouseInNavbarOptions} onMouseOut={handleMouseOutNavbarOptions} onClick={props.closeChat} style={{ cursor: "pointer", boxShadow: "-0.5px 0px 0px 0px #888888", width: "15vw", height: "7vh", position: "relative" }}>
                                            <div className='reciever_chat_options_name' style={{ position: "absolute", left: "10%", top: "15%", fontSize: "110%", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>Close Chat</div>
                                        </div>
                                        <div className='reciever_chat_option' onMouseOver={handleMouseInNavbarOptions} onMouseOut={handleMouseOutNavbarOptions} onClick={openContactPage} style={{ cursor: "pointer", borderTop: "1px solid #e9edef", boxShadow: "-0.5px 0px 0px 0px #888888", width: "15vw", height: "7vh", position: "relative" }}>
                                            <div className='reciever_chat_options_name' style={{ position: "absolute", left: "10%", top: "15%", fontSize: "110%", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>Contact Info</div>
                                        </div>
                                        <div className='reciever_chat_option' onMouseOver={handleMouseInNavbarOptions} onMouseOut={handleMouseOutNavbarOptions} onClick={props.deleteChat} style={{ cursor: "pointer", borderTop: "1px solid #e9edef", boxShadow: "-0.5px 0px 0px 0px #888888", width: "15vw", height: "7vh", position: "relative" }}>
                                            <p className='reciever_chat_options_name' style={{ position: "absolute", left: "10%", top: "15%", fontSize: "110%", fontWeight: "400", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>Delete Chat</p>
                                        </div>
                                    </div>
                                    <nav className="navbar" style={{ backgroundColor: "#f0f2f5", width: "100vw", position: "relative", height: "12vh" }}>
                                        <img className='recieverProfilePhoto' src={"profile_image/" + props.reciever + ".jpg"} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = "profile_image/default_user.jpg";
                                        }} style={{ borderRadius: "50%", position: "absolute" }}></img>
                                        {!activeUsers.some(activeUsers => activeUsers.username === props.reciever) && <div className="talking_nameOfflineWithContactOpen" style={{ color: "#111b21", letterSpacing: "1.10px", position: "absolute", fontWeight: "350", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>
                                            {props.titleCase(props.reciever)}
                                        </div>}
                                        {activeUsers.some(activeUsers => activeUsers.username === props.reciever) && <div className="talking_name" style={{ color: "#111b21", letterSpacing: "1.10px", position: "absolute", fontWeight: "350", fontFamily: "Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif" }}>
                                            {props.titleCase(props.reciever)}
                                        </div>}
                                        {activeUsers.some(activeUsers => activeUsers.username === props.reciever) && <div className='active-user' style={{ color: "green", position: 'absolute' }}>Online</div>}
                                        {/* <FontAwesomeIcon icon={faCircleUser} style={{ position: "absolute", left: "2%", color: "white", height: "70%" }} /> */}
                                        <BsSearch className='searchIconReciever' style={{ color: "#54656f", position: "absolute" }} />
                                        <FontAwesomeIcon className='optionsIconReciever' onClick={() => { props.logOutButtonPopUpFunc('reciever_chat_options') }} icon={faEllipsisV} style={{ cursor: "pointer", position: "absolute", color: "#54656f" }} />
                                    </nav>
                                    <div style={{ width: "100vw", height: "78vh", backgroundImage: "url(" + background + ")", backgroundSize: "contain", overflowY: "scroll", display: "flex", flexDirection: "column-reverse" }}>
                                        <MsgSection reciever={props.reciever} msgList={props.msgList} sender={props.sender} titleCase={props.titleCase} timeToIst={props.timeToIst}></MsgSection>
                                    </div>
                                    <nav className="navbar" style={{ backgroundColor: "#f0f2f5", width: "100vw", position: "relative", height: "10vh", display: "inline-block" }}>
                                        <BsEmojiLaughing className='emojiPicker' onClick={() => { ShowEmojiPicker() }} style={{ color: "#54656f", position: "relative" }} />
                                        <label for="file"><BsPaperclip className='attachFile' style={{ color: "#54656f", position: "relative" }}></BsPaperclip></label>
                                        <input type="file" onChange={props.saveFileChat} id="file" style={{ display: "none" }} />
                                        <input type="text" value={props.msg} onChange={msgChange} placeholder='Type a message' style={{ height: "95%", width: "70%", fontSize: "3vh", borderRadius: "7px", borderColor: "transparent", outline: "none", position: "relative", left: "7%", top: "10%" }}></input>
                                        <MdSend className='msgSubmit' onClick={props.msgSubmit} style={{ color: "#54656f", position: "relative" }}></MdSend>
                                    </nav>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default RightSection