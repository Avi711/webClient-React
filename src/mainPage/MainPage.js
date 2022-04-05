import React, { useState, useRef, useEffect,  } from 'react'
import { useNavigate } from 'react-router-dom';
import Contact from './Contact'
import Contacts from '../database/Contacts';
import AddingContact from './AddingContact';

function MainPage(props) {

    let curUser = props.curUser;

   // useEffect(() => {
    //    localStorage.setItem("user", JSON.stringify(curUser));
    //},)

    //curUser = JSON.parse(localStorage.getItem("user"));

    let obj = Contacts.find(o => o.username == curUser);

    const [inputText, setInputText] = useState("");
    const [List, setList] = useState(obj.userContacts)
    const [isSearch, setIsSearch] = useState(0);

    const searchBox = useRef(null);

    const contactsList = List.map((contact, key) => { return <Contact {...contact} key={key} /> });

    const search = function () {
        setList(obj.userContacts.filter((contact) => contact.contactName.includes(searchBox.current.value)));

    }

    const searchBar = function () {
        (!isSearch ? document.getElementById("search-button").style.backgroundColor = 'rgb(' + [73, 200, 88].join(',') + ')' : document.getElementById("search-button").style.backgroundColor = '');
        //document.getElementById("search-button").style.backgroundColor=''
        setIsSearch(!isSearch)
    }

    return (
        <>
            <div className="row background">
                <div className="logo "><img src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></div>

            </div>

            <div className="container-md main_box">
                <div className="row row-cols-2">
                    <div className="col-5 one"><img src="profile2.png" alt="" className="user-image" />
                        <span className="UserName-title"><b>{curUser}</b></span>




                        {/* Button trigger modal */}
                        <span>
                            <button type="button" className="btn button-solid add-chat-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </button>
                        </span>
                        <span className='btn add-chat-button' id='search-button' onClick={searchBar}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></span>


                        {/* Modal */}
                        <AddingContact curUser={curUser} setList={setList} setInputText={setInputText} inputText={inputText} />

                    </div>


                    <div className="col-7 two">Column2
                    </div>


                    <div className="col-5 three">
                        {/*contact table*/}
                        

                        <div className="contact-table-scroll contact-table1">


                        {(isSearch) ? (<>
                            <span className='search-contact'>
                                <form>
                                    <input type="text" className="form-control" placeholder="Search..." ref={searchBox} onKeyUp={search} />
                                </form>
                            </span>
                            <hr className="solid"></hr>
                        </>) : ""}


                            <table className="table table-hover">
                                <tbody>
                                    {contactsList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-7 four" >
                        <br></br>
                        <div className="row message-body">
                            <div className="col-sm-12 message-main-receiver">
                                <div className="receiver">
                                    <div className="message-text">
                                        <img className='chat-image' src='https://images.maariv.co.il/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_380,w_500/468089'></img>
                                        
                                    </div>
                                    <span className="message-time pull-right">
                                        10:00
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row message-body">
                            <div className="col-sm-12 message-main-sender">
                                <div className="sender">
                                    <div className="message-text">
                                        I am doing nothing man!
                                    </div>
                                    <span className="message-time pull-right">
                                        10:01
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row message-body">
                            <div className="col-sm-12 message-main-receiver">
                                <div className="receiver">
                                    <div className="message-text">
                                        Where are you from?!
                                    </div>
                                    <span className="message-time pull-right">
                                        10:02
                                        
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row message-body">
                            <div className="col-sm-12 message-main-sender">
                                <div className="sender">
                                    <div className="message-text">
                                        I am from Israel!
                                    </div>
                                    <span className="message-time pull-right">
                                        10:03
                                    </span>
                                </div>
                            </div>
                        </div>





                        <div className="row message-box p-3">


                            <span className="col-sm-2" style={{ width: '54px' }}>
                                <button className="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                </svg></button>
                            </span>
                            <span className="col-sm-8" style={{ width: '82%' }}>
                                <form action>
                                    <input type="text" className="form-control" placeholder="Write message..." />
                                </form>
                            </span>
                            <span className="col-sm-2 mt-1" style={{ width: '1rem' }}>
                                <button className="button-solid" id='search-button'><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                </svg></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage