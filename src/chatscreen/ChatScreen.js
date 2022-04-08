import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useRef, useEffect, } from 'react'
import Message from './Message';


function ChatScreen(props) {

    const currentChat = props.userContacts.find(o => o.contactName == props.chatWith[0]).chat;

    const chatList = currentChat.slice(0).reverse().map((message, key) => { if (message.sender == props.curUser) return <Message {...message} type="sender" key={key} />; else return <Message {...message} type="receiver" key={key} />; });

    const [messages, setMessages] = useState(1)
    // (message.sender == props.curUser)

    const openMenu = function () {
        var e = document.getElementById("send-menu");
        if (e.style.display == 'block')
            e.style.display = 'none';
        else
            e.style.display = 'block';
    }

    const searchBox = useRef(null)

    const sendMessage = function (e) {
        e.preventDefault();
        if (searchBox.current.value == "")
            return;
        var time = new Date();
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        currentChat.push({ sender: props.curUser, message: searchBox.current.value, time: curTime })
        setMessages(!messages)
        document.getElementById("message-input").value = document.getElementById("message-input").defaultValue;
        props.setInputText(!props.inputText)
    }

    return (
        <>
            <div className="col-7 four" >
                <div className='all-messages'>
                    {chatList}


                </div>

                <div className="row message-box p-3">

                    <span className="col-sm-2 dropup" style={{ width: '54px' }}>
                        <button onClick={openMenu} className="btn btn-secondary dropbtn" data-bs-toggle="dropdown"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16" >
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                        </svg></button>
                        <div className="dropdown-menu dropup-content">
                            <a className="zoom"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-image " viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                            </svg></a>
                            <a className="zoom"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-mic " viewBox="0 0 16 16">
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                            </svg></a>
                            <a className="zoom"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-camera-video " viewBox="0 0 16 16">
                                <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                            </svg></a>
                            <a className="zoom"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-geo-alt " viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg></a>
                        </div>
                    </span>
                    <span className="col-sm-8 message-form" id="message-form" style={{ width: '90%' }}>
                        <form onSubmit={sendMessage}>
                            <input type="text" id="message-input" className="form-control" placeholder="Write message..." ref={searchBox} />
                            <button type='submit' className="button-solid zoom"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                            </svg></button>
                        </form>
                    </span>
                    {/* <span className="col-sm-2 mt-1" style={{ width: '1rem' }}>
                    </span> */}
                </div>
            </div>


        </>
    )
}

export default ChatScreen