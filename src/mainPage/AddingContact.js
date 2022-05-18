import React, { useState, useRef } from 'react'
import Contacts from '../database/Contacts';
import tempUsers from '../database/DataBase';



function AddingContact(props) {

    
    const addBox = useRef(null);

    const [error, setError] = useState("no");



    const addConatct = function (e) {
        e.preventDefault();
        setError("no");
        if (addBox.current.value == "") {
            setError("miss");
            return;
        }
        let obj = Contacts.find(o => o.username == props.curUser);



        for (var i = 0; i < obj.userContacts.length; i++) {
            if (obj.userContacts[i].contactName == addBox.current.value) {
                setError("exists");
                return;
            }
        }

        let obj_user = tempUsers.find(o => o.username == addBox.current.value);
        if (obj_user == null) {
            setError("noUser");
            return;
        }
        if(obj.username == addBox.current.value) {
            setError("current");
            return;
        }


        const contact = { contactName: obj_user.username, displayname: obj_user.displayname, lastMessage: '', time: new Date(), image: obj_user.image, chat: [] }
        obj.userContacts.unshift(contact)
        props.setList(obj.userContacts)
        props.setInputText(!props.inputText)
        document.getElementById("adding-form").reset();
        props.setChatWith([contact.contactName, contact.image, contact.displayname]);
        var slides = document.getElementsByClassName("toggle-contact");
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove("toggle-contact-color");
        }
        props.setInputText(!props.inputText)
        setError("success")
        document.getElementById("close-adding-contact").click();
        setError(null)

        userServerUpdateAddingContact(contact , server);
        contactServerUpdateAddingContact(server);
    }

    ////////// update both user and contact server for adding new contact //////////////
    async function userServerUpdateAddingContact(obj , server) {
        const res = await fetch(`https://localhost:7018/api/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
            body : JSON.stringify({
                "id" : obj.contactName ,
                "name" : obj.displayName ,
                "server" : server
            })
        });
        const data = await res.json();
        return data.image;
    
    } 
    async function contactServerUpdateAddingContact(server) {
        const res = await fetch(`https://localhost:7018/api/invitations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',},
            body : JSON.stringify({
                "from" : props.curUser,
                "to" : props.chatWith[0],
                "server" : server
            })
        });
        const data = await res.json();
        return data.image;
    
    } 
    ////////////////////////

    return (
        <div className="modal fade" id="add-contact-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Adding new friend</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addConatct} id="adding-form">
                            <div className="mb-3">
                                {(error == "current") ? (<div className="alert alert-danger">You can't add yourself to your contact list</div>) : ""}
                                {(error == "noUser") ? (<div className="alert alert-danger">There is no user by that name</div>) : ""}
                                {(error == "exists") ? (<div className="alert alert-danger">Username already exists in your contact list</div>) : ""}
                                {(error == "miss") ? (<div className="alert alert-danger">Please fill User Name</div>) : ""}
                                {(error == "success") ? (<div className="alert alert-success">{addBox.current.value} added successfully</div>) : ""}


                                <label htmlFor="recipient-name" className="col-form-label">Username:</label>
                                <input ref={addBox} type="text" className="form-control" id="recipient-name" placeholder="Write username here..." />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-bs-dismiss="llllll">Add contact</button>
                                <button type="button" id='close-adding-contact' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddingContact