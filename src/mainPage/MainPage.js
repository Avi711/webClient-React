import React, { useState, useRef, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import Contact from './Contact'
import Contacts from '../database/Contacts';
import AddingContact from './AddingContact';
import ChatScreen from '../chatscreen/ChatScreen';
import ChatScreenHeader from '../chatscreen/ChatScreenHeader';
import tempUsers from '../database/DataBase';
import { Link } from 'react-router-dom';
import connection, { myServer } from '../server';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


function MainPage(props) {

    let curUser = localStorage.getItem('user');
    let userImage = localStorage.getItem('user-image');


    let obj = Contacts.find(o => o.username == curUser);


    let current_tempUsers = tempUsers.find(o => o.username == curUser);

    const [inputText, setInputText] = useState(0);
    const [List, setList] = useState([]);
    const [serverContactsList, setServerContactsList] = useState([])
    const [isSearch, setIsSearch] = useState(0);
    const [chatWith, setChatWith] = useState(0);

    const searchBox = useRef(null);
    const mounted = useRef();

    var con = 0;

    useEffect(() => {
        if(!mounted.current) {
        bringContacts();
        MakeConnection();
        mounted.current = true;
        }
    }, [])

    useEffect(() => {
        convertContacts().then(k => { setList(obj.userContacts) })
    }, [serverContactsList])

    useEffect(() => {
        setInputText(!inputText);
    }, [connection.connection])


    async function MakeConnection() {
        connection.connection = new HubConnectionBuilder().withUrl(`${myServer}/myHub`).configureLogging(LogLevel.Information).build();
        connection.connection.start().then(p => { connection.connection.invoke("MakeConnection", curUser) });
        connection.connection.on('ChangeRecieved', (val, val2) => {
            const chatUserObj = obj.userContacts.find(o => o.contactName == val2)
            const currentChat = chatUserObj.chat;
            var time = new Date();
            var msg = { sender: false, message: val, time: time.getTime() }
            //if(msg.time - currentChat[currentChat.length - 1].time < 40) {
            //    return;
            //}
            currentChat.push(msg);
            chatUserObj.time = time.getTime();
            setInputText(prev => !prev);
        });
        connection.connection.on('addContact', (val) => {
            var newContact = { contactName: val, displayname: val, lastMessage: '', time: new Date(), image: "profile3.png", chat: [{sender: 'none', message: '', time: new Date()}] }
            obj.userContacts.push(newContact);
            setList(obj.userContacts);
            setInputText(prev => !prev);
        });
    }

    async function bringContacts() {
        const res = await fetch(`${myServer}/api/contacts`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
        });
        const data = await res.json();
        setServerContactsList(data);
    }

    async function bringMessages(contactId) {
        const res = await fetch(`${myServer}/api/contacts/${contactId}/messages`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
        });
        const data = await res.json();
        return data;
    }

    ///////////////////////////////////
    async function convertContacts() {
        if (obj == null) {
            var newContact = {
                username: curUser,
                userContacts: []
            }
            Contacts.push(newContact);
            obj = newContact;
        }
        obj.userContacts = [];
        serverContactsList.map((contact, key) => {
            const newContact = { contactName: contact.id, displayname: contact.name, lastMessage: contact.last, time: new Date(contact.lastdate).getTime(), image: "profile3.png", chat: [] }
            bringMessages(contact.id).then(p => { newContact.chat = convertMessages(p); });
            obj.userContacts.push(newContact);
        });
    }

    function convertMessages(messages) {
        const list = [];
        messages.map((message, key) => {
            const newMessage = { sender: message.sent, message: message.content, time: new Date(message.created).getTime() }
            list.push(newMessage);
        });
        return list;
    }
    ////////////////////////////////////////

    List.sort((a, b) => (a.time > b.time) ? -1 : 1);


    const contactsList = List.map((contact, key) => {
        if (contact.chat.length > 0) return <Contact {...contact} lastMessage={contact.chat.at(-1).message} time={contact.chat.at(-1).time} key={key} setChatWith={setChatWith} />;
        else return <Contact {...contact} key={key} setChatWith={setChatWith} />
    });

    const search = function () {
        setList(obj.userContacts.filter((contact) => contact.contactName.includes(searchBox.current.value)));
    }

    const searchBar = function () {
        (!isSearch ? document.getElementById("search-button").style.backgroundColor = 'rgb(' + [73, 200, 88].join(',') + ')' : document.getElementById("search-button").style.backgroundColor = '');
        //document.getElementById("search-button").style.backgroundColor=''
        setIsSearch(!isSearch)
        if (isSearch) {
            setList(obj.userContacts.filter((contact) => contact.contactName.includes("")));
        }
    }



    return (
        <>
            <div className="row background">
                <div className="logo "><img src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></div>

            </div>

            <div className='container-a'>

                <div className="container-md- main_box">
                    <div className="row row-cols-2">
                        <div className="col-5 one"><img src={userImage} alt="" className="user-image" />
                            <span className="UserName-title"><b>{curUser}</b></span>




                            {/* Button trigger modal */}
                            <span>
                                <button type="button" className="btn button-solid add-chat-button zoom" data-bs-toggle="modal" data-bs-target="#add-contact-modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                </button>
                            </span>
                            <span className='btn add-chat-button zoom' id='search-button' onClick={searchBar}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></span>


                            {/* Modal */}
                            <AddingContact curUser={curUser} setList={setList} setInputText={setInputText} inputText={inputText} setChatWith={setChatWith} />

                        </div>
                        {(chatWith) ? <ChatScreenHeader curUser={curUser} chatWith={chatWith} /> : <div className="col-7" style={{ backgroundColor: 'white', borderTopRightRadius: '1rem' }}></div>}

                        <div className="col-5 three">
                            {/*contact table*/}

                            <div className="contact-table-scroll contact-table1">

                                {(isSearch) ? (<>
                                    <span className='search-contact'>
                                        <form onSubmit={(e) => { e.preventDefault() }}>
                                            <input type="text" className="form-control" placeholder="Search..." ref={searchBox} onKeyUp={search} />
                                        </form>
                                    </span>
                                    <hr className="solid"></hr>
                                </>) : ""}

                                <table className="table table-hover contact-table2">
                                    <tbody>
                                        {contactsList}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {(chatWith) ? <ChatScreen curUser={curUser} chatWith={chatWith} userContacts={obj.userContacts} setInputText={setInputText} inputText={inputText} /> : <div className="col-7" style={{ backgroundColor: 'white', borderBottomRightRadius: '1rem' }}></div>}
                    </div>
                    {/* <Link to="/">click me</Link> */}
                </div>
            </div>

        </>
    )
}

export default MainPage