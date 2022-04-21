import React from 'react'
import {timeToString} from '../mainPage/Contact';

function Message(props) {
    let class_name1 ="col-sm-12 message-main-receiver" ;

    if(props.type=="sender"){
        class_name1="col-sm-12 message-main-sender";

    }

    return (

        <div className="row message-body">

            <div className={class_name1}>
                <div className={props.type}>
                    <div className="message-text">
                        {props.message}
                    </div>
                    <span className="message-time pull-right">
                        {timeToString(props.time)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Message