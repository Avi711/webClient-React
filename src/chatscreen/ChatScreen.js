import React from 'react'

function ChatScreen() {
    return (
        <>
            <div className="col-7 two"><img src="profile2.png" alt="" className="user-image" />
                <span className="UserName-title"><b>{curUser}</b></span>
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



                    <span className="col-sm-2 dropup" style={{ width: '54px' }}>
                        <button className="btn btn-secondary dropbtn"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                        </svg></button>
                        <div className="dropup-content">
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                            </svg></a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                            </svg></a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                            </svg></a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg></a>
                        </div>
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


        </>
    )
}

export default ChatScreen