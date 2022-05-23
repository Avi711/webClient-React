import React from 'react'
import { timeToString } from '../mainPage/Contact';

function Message(props) {
    if(props.sender == 'none') {
        return (<></>)
    }
    let class_name1 = "col-sm-12 message-main-receiver";

    if (props.type == "sender") {
        class_name1 = "col-sm-12 message-main-sender";
    }
   // if (props.type == "message-date") {
   //     class_name1 = "col-sm-12 message-main-date";
   //     document.getElementById("message-time").remove();
   // }

    function printDate() {
        return (<div className="row message-body">
            <div className="col-sm-12 message-main-sender">
                <div className="message-date">
                    <div className="message-text">
                        {props.date}
                    </div>
                </div>
            </div>
        </div>)
    }

    return (
        <>
        {(props.flag === 1) ? printDate() : "" }
        <div className="row message-body">
            <div className={class_name1}>
                <div className={props.type}>
                    <div className="message-text">
                        {props.message}
                    </div>
                    <span id='message-time' className="message-time pull-right">
                        {timeToString(props.time)}
                    </span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Message