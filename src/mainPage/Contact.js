import React from 'react'

function Contact(props) {
    return (
        <tr>
            <td className="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" className="profile-image rounded-circle " /></td>
            <td><b>{props.contactName} </b><br /> <small>{props.contactMessage}</small></td>
            <td className="time"><small>{props.time}</small></td>
        </tr>
    )
}

export default Contact