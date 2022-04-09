import React, { useState, useRef } from 'react'
import Contacts from '../database/Contacts';


function AddingContact(props) {
    const addBox = useRef(null);

    const [error, setError] = useState("no");
    const [modalClose, setModalClose] = useState("modal");

    const addConatct = function (e) {
        e.preventDefault();
        let obj = Contacts.find(o => o.username == props.curUser);

        if (addBox.current.value == "") {
            setModalClose("no");
            return;
        }

        // for (var i = 0; i < obj.userContacts.length; i++) {
        //     if()
        //     obj.userContacts[i].contactName == addBox.current.value
        // }


        const contact = { contactName: addBox.current.value, lastMessage: '', time: '', image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Netanyahu_official_portrait_%28cropped%29.jpg/250px-Netanyahu_official_portrait_%28cropped%29.jpg", chat: [] }
        obj.userContacts.unshift(contact)
        props.setList(obj.userContacts)
        props.setInputText(!props.inputText)
        document.getElementById("adding-form").reset();
        props.setChatWith([contact.contactName, "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Netanyahu_official_portrait_%28cropped%29.jpg/250px-Netanyahu_official_portrait_%28cropped%29.jpg"]);
        var slides = document.getElementsByClassName("toggle-contact");
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove("toggle-contact-color");
        }
        props.setInputText(!props.inputText)

        //document.getElementById(props.contactName).classList.add("toggle-contact-color")
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Adding new friend</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addConatct} id="adding-form">
                            <div className="mb-3">
                                {(error == "yes") ? (<div className="alert alert-danger">Username already exists in your contact list</div>) : ""}
                                <label htmlFor="recipient-name" className="col-form-label">Username:</label>
                                <input ref={addBox} type="text" className="form-control" id="recipient-name" placeholder="Write username here..." />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Add contact</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddingContact