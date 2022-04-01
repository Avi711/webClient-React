import React from 'react'

function MainPage(props) {
    return (
        <>
           <div class= "row background">
            <div class = "logo "><img src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></div>
            
        </div>


        <div class="container-lg main_box">
            <div class="row row-cols-2">
              <div class="col-5 one"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" class="user-image rounded-circle "></img> <span class="UserName-title"><b>User Name</b></span></div>
              <div class="col-7 two">Column2 </div>
              <div class="col-5 three">
                
                <div class="contact-table-scroll">
                  <table class="table table-hover">
                    <tbody>
                      
                      <tr >
                        <td class ="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" class="profile-image rounded-circle "></img></td>
                        <td><b>Rahul Kumar </b><br></br> <small>achi chal rahi</small></td>
                        <td class ="time"><small >11:55 PM</small></td>
                      </tr>
                      <tr >
                        <td class ="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" class="profile-image rounded-circle"></img></td>
                        <td><b>Jack </b><br></br> <small>Bye tata</small></td>
                        <td class ="time"><small >10:09 PM</small></td>
                      </tr>
                      <tr >
                        <td class ="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" class="profile-image rounded-circle"></img></td>
                        <td><b>Bullywood Mafia</b> <br></br> <small>Drg Drg Drg</small></td>
                        <td class ="time"><small>Monday</small></td>
                      </tr>
                      <tr >
                        <td class ="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" class="profile-image rounded-circle"></img></td>
                        <td><b>Sumit Jha</b><br></br> <small>Corona ho gaya kya</small></td>
                        <td class ="time"><small>9/22/20</small></td>
                      </tr>
                      <tr>
                        <td class ="contact-photo-width"><img src="NicePng_watsapp-icon-png_9332131.png" alt="" class="profile-image rounded-circle"></img></td>
                        <td><b>News Channel</b> <br></br> <small>Bekar news only</small></td>
                        <td class ="time"><small>Sunday</small></td>
                      </tr>     
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-7 four">Column4</div>
            </div>
          </div>
        </>
    )
}

export default MainPage