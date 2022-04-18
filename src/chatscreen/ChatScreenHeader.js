import React from 'react'
import MainPage from '../mainPage/MainPage'

function ChatScreenHeader(props) {
    return (
        <div className="col-7 two"><img src={props.chatWith[1]} alt="" className="user-image" />
            <span className="UserName-title"><b>{props.chatWith[2]}</b></span>
        </div>
    )
}

export default ChatScreenHeader