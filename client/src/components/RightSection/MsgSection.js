import React, { useState } from 'react';
export default function MsgSection(props) {
    return (
        <>
            {props.msgList && [...props.msgList].reverse().map((user) => (
                user.sender == props.sender ? <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {user.message.length == 0 ? <div style={{ padding: "0.5vw", backgroundColor: "#d1f4cc", borderRadius: "10px" }}>
                        <a href={require("../chatImages/" + user.image)} download={props.reciever+"_"+props.sender+"_"+user.image}>
                            <img style={{ height: "15vw", width: "15vw", borderRadius: "10px" }} src={require("../chatImages/" + user.image)}></img>
                        </a>
                    </div> :
                        <div className='msgSender' style={{ wordWrap: "break-word", backgroundColor: "#d1f4cc", display: "inline-block", padding: "0.5rem", borderRadius: "10px", margin: "1.5vh", maxWidth: "32.45vw", color: "black" }}>
                            {props.titleCase(user.message)}
                            <span className='msgTiming' style={{ backgroundColor: "#d1f4cc", position: "relative", top: "1.25vh", left: "0.3vw", color: "#667781", paddingRight: "0.2vw" }}>
                                {user.createdAt.length > 10 ?
                                    props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 1, props.timeToIst(user.updatedAt).indexOf(",") + 6) + " " + props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 10, props.timeToIst(user.updatedAt).indexOf(",") + 13).toLowerCase() :
                                    user.createdAt.substr(0, user.createdAt.indexOf(":")) + user.createdAt.substr(user.createdAt.indexOf(":"), user.createdAt.indexOf(":") + 1) + " " + user.createdAt.substr(user.createdAt.length - 2, user.createdAt.length)}
                            </span>
                        </div>}
                </div> :
                    user.message.length == 0 ? <div style={{ padding: "0.5vw", borderRadius: "10px" }}>
                        <a href={require("../chatImages/" + user.image)} download={props.reciever+"_"+props.sender+"_"+user.image}>
                            <img style={{ display: "inline-block", height: "15vw", width: "15vw", borderRadius: "10px" }} src={require("../chatImages/" + user.image)}></img>
                        </a>
                    </div> :
                        <div>
                            <div className='msgRec' style={{ wordWrap: "break-word", backgroundColor: "white", display: "inline-block", padding: "0.5rem", borderRadius: "10px", margin: "1.5vh", color: "black", maxWidth: "32.45vw" }}>
                                {props.titleCase(user.message)}
                                <span className='msgRecTiming' style={{ backgroundColor: "white", position: "relative", top: "1.40vh", left: "0.5vw", color: "#667781", paddingRight: "0.5vw" }}>
                                    {user.createdAt.length > 10 ?
                                        props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 1, props.timeToIst(user.updatedAt).indexOf(",") + 6) + " " + props.timeToIst(user.updatedAt).substring(props.timeToIst(user.updatedAt).indexOf(",") + 10, props.timeToIst(user.updatedAt).indexOf(",") + 13).toLowerCase() :
                                        user.createdAt.substr(0, user.createdAt.indexOf(":")) + user.createdAt.substr(user.createdAt.indexOf(":"), user.createdAt.indexOf(":") + 1) + " " + user.createdAt.substr(user.createdAt.length - 2, user.createdAt.length)}
                                </span>
                            </div>
                        </div>
            ))}
        </>
    )
}