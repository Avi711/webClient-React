import { useState, useRef, useEffect } from "react"
import React from 'react'
import { wait } from "@testing-library/user-event/dist/utils";


function SendModals(props) {
    const [image, setImage] = useState("")
    const [record, setRecord] = useState("")

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
    function voice_msg(event) {
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
        setRecord(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const sendImage = function (e) {
        e.preventDefault();
        var time = new Date();
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        props.currentChat.push({ sender: props.curUser, message: <img style={{ width: "100%", marginBottom: "0.3rem" }} src={image}></img>, time: curTime })
        props.setInputText(!props.inputText)
        document.getElementById("close-image-modal").click();
        document.getElementById("chat-image").reset();
    }


    function getVideo() {
        navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 } }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch(err => { console.error(err); })
    }
    useEffect(() => { getVideo(); }, [videoRef]);

    function takePhoto() {
        const width = 414;
        const height = 414 / (16 / 9);
        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
    }



    function start_record() {
        
        document.getElementById("msg").innerHTML = "<img style = {{width:'100%'}} src='https://i.gifer.com/YdBO.gif'/>"
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                let recorder = new MediaRecorder(stream);
                recorder.start();
                let items = [];
                recorder.addEventListener("dataavailable", e => {

                    items.push(e.data);
                });
                recorder.addEventListener("stop", e => {

                    let blob = new Blob(items);
                    let audio_url = URL.createObjectURL(blob);
                    let audio = new Audio(audio_url);
                    audio.setAttribute("controls", 1);
                    document.getElementById('my_record').appendChild(audio);
                    setRecord(audio)
                });
                document.getElementById('stopRecord').onclick = () => {
                recorder.stop()
                document.getElementById("msg").innerHTML = "";

                }
            });

            
    }

    const sendRecord = function (e) {
        e.preventDefault();
        var time = new Date();
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        props.currentChat.push({ sender: props.curUser, message: record, time: curTime })
        props.setInputText(!props.inputText)
        document.getElementById("close-record-modal").click();
        document.getElementById("chat-record").reset();
    }


return (
    <>
        <script type="text/javascript" src="https://code.jquery.com/jquery.min.js"></script>
        <script src="https://markjivko.com/dist/recorder.js"></script>


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
                            <img style={{ maxWidth: "100%" }} src={image}></img>
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

        <div className="modal fade" id="send-record-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Voice record</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="chat-record" onSubmit={sendRecord}>
                        <div className="modal-body">
                            <div className="center1" id="my_record">
                                <button type="button" style={{ background: 'url(https://webaudiodemos.appspot.com/AudioRecorder/img/mic128.png)', width: '100px', height: '130px', border: 'none' }} id="satrt_record" />
                                <label><button type="button" onClick={start_record} id="startRecord">Start</button></label>
                                <label><button  type="button" id="stopRecord">Stop</button></label>
                                <span style={{width:'100%'}} id="msg"></span>

                            </div>


                            <hr className="solid"></hr>
                            <label>Choose a file&nbsp;</label>
                            <input onChange={voice_msg} type="file" accept="audio/*" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close-record-modal" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
)
}

export default SendModals