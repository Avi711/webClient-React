import React from 'react'
import Contacts from '../database/Contacts';


export function timeToString(t) {
    var time = new Date(t);
    const [hour, minute] = time.toString().split(' ')[4].split(':')
    return(hour + ':' +  minute)
}

export function onContactColor (contactName) {
    var slides = document.getElementsByClassName("toggle-contact");
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("toggle-contact-color");
    }
    document.getElementById(contactName).classList.add("toggle-contact-color")

}

function Contact(props) {


    const onContact = function () {
        onContactColor(props.contactName);     
        props.setChatWith([props.contactName, props.image, props.displayname]);
    }

    function messageType() {

        if(props.lastMessage == null) {
            return (<small>{props.lastMessage}</small>);
        }

        else if (props.lastMessage.type == "video") {
            return (<small>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-camera-video " viewBox="0 0 16 16">
                    <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                </svg> Video</small>);
        }
        else if (props.lastMessage.type == "img") {
            return (<small>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                </svg> Image</small>);
        }
        else if (props.lastMessage.type == "audio") {
            return (<small>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-mic " viewBox="0 0 16 16">
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                </svg> Audio</small>);
        }

        else {
            return (<small>{props.lastMessage}</small>);
        }

    }

    return (
        <tr id={props.contactName} className="toggle-contact" onClick={onContact}>
            <td className="contact-photo-width"><img src={props.image} alt="" className="profile-image" /></td>
            <td className='last-message'><b>{props.displayname} </b><br />
                {messageType()}
            </td>
            <td className="time" ><small>{(props.time == null) ? "" : timeToString(props.time)}</small></td>
        </tr>
    )
}

export default Contact