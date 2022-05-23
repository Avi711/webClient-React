import React, { useState, useRef } from 'react'
import Contacts from '../database/Contacts';
import tempUsers from '../database/DataBase';
import connection, {myServer} from '../server';


function AddingContact(props) {

    
    const nameBox = useRef(null);
    const serverBox = useRef(null);
    const displayNameBox = useRef(null);

    const [error, setError] = useState("no");



    async function addConatct (e) {
        e.preventDefault();
        setError("no");
        if (nameBox.current.value == "" || serverBox.current.value == "" || displayNameBox.current.value == "") {
            setError("miss");
            return;
        }
        let obj = Contacts.find(o => o.username == props.curUser);

        for (var i = 0; i < obj.userContacts.length; i++) {
            if (obj.userContacts[i].contactName == nameBox.current.value) {
                setError("exists");
                return;
            }
        }

         let obj_user = tempUsers.find(o => o.username == nameBox.current.value);
        // if (obj_user == null) {
        //     setError("noUser");
        //     return;
        // }

        if(obj.username == nameBox.current.value) {
            setError("current");
            return;
        }


        var check = await contactServerUpdateAddingContact();
        console.log(check);
        if(check.status != 201)
        {
            setError("contact-server-error")
            return;
        }
        check = await userServerUpdateAddingContact();
        if(check.status != 201) {
            setError("user-server-error");
            return;
        }
        const contact = { contactName: nameBox.current.value, displayname: displayNameBox.current.value, lastMessage: '', time: new Date(), image: "profile3.png", chat: [{sender: 'none', message: '', time: new Date()}] }
        obj.userContacts.unshift(contact)
        props.setList(obj.userContacts);
        document.getElementById("adding-form").reset();
        props.setChatWith([contact.contactName, contact.image, contact.displayname]);
        var slides = document.getElementsByClassName("toggle-contact");
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove("toggle-contact-color");
        }
        connection.connection.invoke("ChangedContact", props.curUser, contact.contactName);
        document.getElementById("close-adding-contact").click();
        setError(null)
    }

    ////////// update both user and contact server for adding new contact //////////////
    async function userServerUpdateAddingContact() {
        const res = await fetch(`${myServer}/api/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
            body : JSON.stringify({
                "id" : nameBox.current.value ,
                "name" : displayNameBox.current.value ,
                "server" : serverBox.current.value
            })
        });
        console.log(res);
        return res;
    
    } 
    async function contactServerUpdateAddingContact() {
        var res;
        res = await fetch(`${serverBox.current.value}/api/invitations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',},
            body : JSON.stringify({
                "from" : props.curUser,
                "to" : nameBox.current.value,
                "server" : myServer
            })
        }).catch(p => res = -1);
        return res;
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
                                {(error == "contact-server-error") ? (<div className="alert alert-danger">Can't connect to contact server OR contact don't exists in this server</div>) : ""}
                                {(error == "user-server-error") ? (<div className="alert alert-danger">Can't reach server</div>) : ""}
                                {(error == "current") ? (<div className="alert alert-danger">You can't add yourself to your contact list</div>) : ""}
                                {(error == "noUser") ? (<div className="alert alert-danger">There is no user by that name</div>) : ""}
                                {(error == "exists") ? (<div className="alert alert-danger">Username already exists in your contact list</div>) : ""}
                                {(error == "miss") ? (<div className="alert alert-danger">Please fill User Name</div>) : ""}
                                {(error == "success") ? (<div className="alert alert-success">{nameBox.current.value} added successfully</div>) : ""}


                                <label htmlFor="recipient-name" className="col-form-label">Username:</label>
                                <input ref={nameBox} type="text" className="form-control" id="recipient-name" placeholder="Write username here..." />

                                <label htmlFor="recipient-name" className="col-form-label">displayName:</label>
                                <input ref={displayNameBox} type="text" className="form-control" id="recipient-name" placeholder="Write display name here..." />

                                <label htmlFor="recipient-name" className="col-form-label">Server:</label>
                                <input ref={serverBox} type="text" className="form-control" id="recipient-name" placeholder="Write server here..." />
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