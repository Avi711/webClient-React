import { useState, useRef, useEffect } from "react"
import React from 'react'


function SendModals(props) {
    const [image, setImage] = useState("")
    const videoRef = useRef(null);
    const photoRef = useRef(null);


    function photo(event) {
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const sendImage = function (e) {
        e.preventDefault();
        var time = new Date();
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        props.currentChat.push({ sender: props.curUser, message: <img style={{width: "100%", marginBottom: "0.3rem"}} src={image}></img>, time: curTime })
        props.setInputText(!props.inputText)
        document.getElementById("close-image-modal").click();
        document.getElementById("chat-image").reset();
    }


    function getVideo() {
        navigator.mediaDevices.getUserMedia({video: {width: 1920, height: 1080}}).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch(err => {console.error(err);})
    }
    useEffect(() => {getVideo();}, [videoRef]);

    function takePhoto() {
        const width = 414;
        const height = 414 / (16/9);
        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
    }



    return (
        <>
            <div className="modal fade" id="send-image-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="chat-image" onSubmit={sendImage}>
                        <div className="modal-body">
                            <video ref={videoRef}></video>
                            <canvas ref={photoRef}></canvas>
                            <img style={{maxWidth: "100%"}} src={image}></img>
                            <button type="button" className="btn btn-secondary" onClick={takePhoto}>take photo</button>
                            <hr class="solid"></hr>
                            <label>Choose a profile picture: (Optional)&nbsp;</label>
                            <input onChange={photo} type="file" accept="image/png, image/jpeg" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close-image-modal" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success">Send Image</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}

export default SendModals