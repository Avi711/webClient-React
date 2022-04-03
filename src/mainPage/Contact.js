import React from 'react'

function Contact(props) {
    return (
        <tr>
            <td className="contact-photo-width"><img src={props.image} alt="" className="profile-image" /></td>
            <td><b>{props.contactName} </b><br /> <small>{props.contactMessage}</small></td>
            <td className="time"><small>{props.time}</small></td>
        </tr>
    )
}

export default Contact