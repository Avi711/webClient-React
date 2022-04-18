import React from 'react'
import Contacts from '../database/Contacts';
function Contact(props) {



    const onContact = function () {
        //document.getElementsByClassName("toggle-contact").array.foreach((value) => { value.classList.remove("back-top") });

        var slides = document.getElementsByClassName("toggle-contact");
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove("toggle-contact-color");
        }
        document.getElementById(props.contactName).classList.add("toggle-contact-color")
        props.setChatWith([props.contactName, props.image, props.displayname]);
    }

    const dontContact = function () {
        var slides = document.getElementsByClassName("toggle-contact");
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove("toggle-contact-color");
        }
    }




    return (

        <tr id={props.contactName} className="toggle-contact" onClick={onContact}>
            <td className="contact-photo-width"><img src={props.image} alt="" className="profile-image" /></td>
            <td className='last-message'><b>{props.displayname} </b><br />
                {typeof props.lastMessage !== 'string' ? <small>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                    </svg> Image</small> : <small>{props.lastMessage}</small>}
            </td>
            <td className="time" ><small>{props.time}</small></td>
        </tr>
    )
}

export default Contact