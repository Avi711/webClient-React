import React, { useState, useRef, useEffect, } from 'react'
import Message from './Message';
import SendModals from './SendModals';


const myServer = "https://localhost:44306";


function ChatScreen(props) {

    const videoRef = useRef(null);
    const videoRef2 = useRef(null);

    const chatUserObj = props.userContacts.find(o => o.contactName == props.chatWith[0])
    const currentChat = chatUserObj.chat;


    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    let tempDate = (new Date(1550553845894)).toLocaleDateString("en-US", options);
    const chatList = currentChat.slice(0).map((message, key) => {
        let currentDate = (new Date(message.time)).toLocaleDateString("en-US", options);
        if (message.sender == true) {
            if (currentDate === tempDate)
                return (<Message {...message} type="sender" flag={0} key={key} />);
            else {
                tempDate = currentDate;
                return (<Message {...message} type="sender" flag={1} date={currentDate} key={key} />);
            }
        }
        else {
            if (currentDate === tempDate)
                return (<Message {...message} type="receiver" flag={0} key={key} />);
            else {
                tempDate = currentDate;
                return (<Message {...message} type="receiver" flag={1} date={currentDate} key={key} />);
            }
        }
    });

    const openMenu = function () {
        var e = document.getElementById("send-menu");
    }

    const searchBox = useRef(null)

    const sendMessage = function (e) {
        e.preventDefault();
        if (searchBox.current.value == "")
            return;
        var time = new Date();
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        var msg = { sender: true, message: searchBox.current.value, time: time.getTime() }
        currentChat.push(msg);
        chatUserObj.time = time.getTime();
        //setMessages(!messages)
        //<audio id="player" controls></audio>
        document.getElementById("message-input").value = document.getElementById("message-input").defaultValue;
        props.setInputText(!props.inputText)
        setTimeout(() => { document.getElementById(props.chatWith[0]).click(); }, 10);
        
        userServerUpdateMessage(msg.message);
        contactServerUpdateMessage(msg.message);

    }
    ////////// update both user and contact server for a new message //////////////
    async function userServerUpdateMessage(content) {
        const res = await fetch(`${myServer}/api/contacts/${props.chatWith[0]}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
            body : JSON.stringify({
                "content" : content
            })
        });
        return res;
    
    } 
    async function contactServerUpdateMessage(content) {
        const res = await fetch(`${myServer}/api/transfer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',},
            body : JSON.stringify({
                "from" : props.curUser,
                "to" : props.chatWith[0],
                "content" : content
            })
        });
        console.log(res);
        return res;
    
    } 
    ////////////////////////
    function updateScroll() {
        setTimeout(() => {
            var element = document.getElementById("all-messages1");
            element.scrollTop = element.scrollHeight;
        }, 10);
    }


    function showVideo(ref) {
                    
        setTimeout(() => {
            let video = ref.current;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                    video.srcObject = stream;
                    video.play();
                    video.volume = 0;
                    // document.getElementById("send-image-modal").addEventListener('hidden.bs.modal', () => {
                    //     stream.getTracks().forEach(track => track.stop())
                    // });
                    // document.getElementById("record-video-modal").addEventListener('hidden.bs.modal', () => {
                    //     stream.getTracks().forEach(track => track.stop())
                    // });
                })
            }
        }, 10);
    }

    return (
        <>
            <div className="col-7 four" >
                <div id='all-messages1' className='all-messages'>
                    {chatList}
                    {updateScroll()}
                </div>
                <SendModals videoRef={videoRef} videoRef2={videoRef2} currentChat={currentChat} inputText={props.inputText} 
                            setInputText={props.setInputText} curUser={props.curUser} chatUserObj={chatUserObj}
                            userServerUpdateMessage={userServerUpdateMessage} contactServerUpdateMessage={contactServerUpdateMessage}
                            chatWith={props.chatWith}  />

                <div className="row message-box p-3">

                    <div className='attach-button'>
                        <button onClick={openMenu} className="btn btn-secondary dropbtn" data-bs-toggle="dropdown"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16" >
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                        </svg></button>
                        <div className="dropdown-menu dropup-content">

                            <a data-bs-toggle="modal" data-bs-target="#send-image-modal" className="zoom" onClick={showVideo(videoRef2)}><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-image " viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                            </svg></a>

                            <a data-bs-toggle="modal" data-bs-target="#send-record-modal" className="zoom"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-mic " viewBox="0 0 16 16">
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                            </svg></a>

                            <a data-bs-toggle="modal" data-bs-target="#send-video-modal" className="zoom"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-camera-video " viewBox="0 0 16 16">
                                <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                            </svg></a>

                            <a data-bs-toggle="modal" data-bs-target="#record-video-modal" className="zoom" onClick={showVideo(videoRef)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-record-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            </svg></a>
                        </div>
                    </div>
                    <div id="message-form">
                        <form onSubmit={sendMessage} id="message-input-form" style={{ display: 'flex' }}>

                            <input type="text" id="message-input" className="form-control" placeholder="Write message..." ref={searchBox} />
                            <button type='submit' className="button-solid zoom"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                            </svg></button>
                        </form>
                    </div>
                    {/* <span className="col-sm-2 mt-1" style={{ width: '1rem' }}>
                    </span> */}
                </div>
            </div>
        </>
    )
}

export default ChatScreen