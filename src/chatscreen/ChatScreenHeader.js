import React from 'react'
import MainPage from '../mainPage/MainPage'

function ChatScreenHeader(props) {
    return (
        <div className="col-7 two"><img src="profile2.png" alt="" className="user-image" />
            <span className="UserName-title"><b>{props.curUser}</b></span>
        </div>
    )
}

export default ChatScreenHeader