import React from 'react'

function Contact(props) {



    const onContact = function () {
       //document.getElementsByClassName("toggle-contact").array.foreach((value) => { value.classList.remove("back-top") });

        var slides = document.getElementsByClassName("toggle-contact");
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove("toggle-contact-color");
        }
        document.getElementById(props.contactName).classList.add("toggle-contact-color")
        props.setChatWith([props.contactName, props.image]);
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
            <td><b>{props.contactName} </b><br /> <small>{props.lastMessage}</small></td>
            <td className="time" ><small>{props.time}</small></td>
        </tr>
    )
}

export default Contact