import React from 'react'

function MainPage(props) {
  return (
    <>
      <div class="row background">
        <div class="logo "><img src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></div>

      </div>


      <div className="container-lg main_box">
        <div className="row row-cols-2">
          <div className="col-5 one"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" className="user-image rounded-circle " />
            <span className="UserName-title"><b>User Name</b></span>
            <button className="add-chat-button button-solid "><svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
            </svg></button>


            <button type="button" className ="add-chat-button button-solid" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>



          </div>
          <div className="col-7 two">Column2 </div>
          <div className="col-5 three">
            {/*contact table*/}
            <div className="contact-table-scroll">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <td className="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" className="profile-image rounded-circle " /></td>
                    <td><b>Rahul Kumar </b><br /> <small>achi chal rahi</small></td>
                    <td className="time"><small>11:55 PM</small></td>
                  </tr>
                  <tr>
                    <td className="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" className="profile-image rounded-circle" /></td>
                    <td><b>Jack </b><br /> <small>Bye tata</small></td>
                    <td className="time"><small>10:09 PM</small></td>
                  </tr>
                  <tr>
                    <td className="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" className="profile-image rounded-circle" /></td>
                    <td><b>Bullywood Mafia</b> <br /> <small>Drg Drg Drg</small></td>
                    <td className="time"><small>Monday</small></td>
                  </tr>
                  <tr>
                    <td className="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" className="profile-image rounded-circle" /></td>
                    <td><b>Sumit Jha</b><br /> <small>Corona ho gaya kya</small></td>
                    <td className="time"><small>9/22/20</small></td>
                  </tr>
                  <tr>
                    <td className="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" className="profile-image rounded-circle" /></td>
                    <td><b>News Channel</b> <br /> <small>Bekar news only</small></td>
                    <td className="time"><small>Sunday</small></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-7 four">
            <div className="row message-box p-3">
              <div className="col-sm-2 mt-2" style={{ width: '54px' }}>
                <button className="button-solid"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                </svg></button>
              </div>
              <div className="col-sm-8" style={{ width: '82%' }}>
                <form action>
                  <input type="text" className="form-control" placeholder="Write message..." />
                </form>
              </div>
              <div className="col-sm-2 mt-1" style={{ width: '54px' }}>
                <button className="button-solid"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage