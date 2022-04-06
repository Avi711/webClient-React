import React from 'react'

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
                        I am doing nothing man!
                    </div>
                    <span className="message-time pull-right">
                        10:01
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Message