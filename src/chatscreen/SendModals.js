import { useState, useRef, useEffect } from "react"
import React from 'react'
import $ from 'jquery'
import { wait } from "@testing-library/user-event/dist/utils";


function SendModals(props) {
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [videoError, setVideoError] = useState("");
    const [record, setRecord] = useState("");
    const [imageError, setImageError] = useState("");
    const [recorderror, setRecordError] = useState("");


    const videoRef = useRef(null);
    const photoRef = useRef(null);


    document.addEventListener('hidden.bs.modal', function (event) {
        document.getElementById("msg").innerHTML = "";
        setRecordError("");
        setRecord("");
        removeLastRecord();
        setVideo("");
        setVideoError("");
        setImageError("");
        setImage("");
    });

    function removeLastRecord() {
        const list = document.getElementById("my_record");
        if (list.lastElementChild) {
            list.removeChild(list.lastElementChild);
        }
    }

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
    function readVideo(event) {
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            setVideo(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const sendVideo = function (e) {
        e.preventDefault();
        if (video == "") {
            setVideoError("miss");
            return;
        }
        var time = new Date();
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        props.currentChat.push({ sender: props.curUser, message: <video style={{ width: "100%", marginBottom: "0.1rem" }} src={video} controls></video>, time: time.getTime() })
        props.setInputText(!props.inputText)
        document.getElementById("close-video-modal").click();
        document.getElementById("video-form").reset();
    }



    const sendImage = function (e) {
        e.preventDefault();
        if (image === "") {
            setImageError("miss");
            return;
        }
        var time = new Date();
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        props.currentChat.push({ sender: props.curUser, message: <img style={{ width: "100%", marginBottom: "0.3rem" }} src={image}></img>, time: time.getTime() })
        props.setInputText(!props.inputText)
        document.getElementById("close-image-modal").click();
        document.getElementById("image-form").reset();
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
                    audio.style.width = "100%";
                    audio.setAttribute("controls", 1);
                    document.getElementById('my_record').appendChild(audio);
                    setRecord(audio_url)
                });

                document.getElementById('stopRecord').onclick = () => {
                    recorder.stop()
                    document.getElementById("msg").innerHTML = "";
                    const list = document.getElementById("my_record");
                    if (list.lastElementChild) {
                        list.removeChild(list.lastElementChild);
                    }
                }
            });
    }

    const sendRecord = function (e) {

        e.preventDefault();
        var time = new Date();
        if (record === "") {
            setRecordError("miss");
            return;
        }
        const curTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        props.currentChat.push({ sender: props.curUser, message: <audio style={{ maxWidth: '100%' }} preload="auto" src={record} controls="1"></audio>, time: time.getTime() })
        props.setInputText(!props.inputText)
        document.getElementById("close-record-modal").click();
        document.getElementById("voice-form").reset();
        setRecord("")
    }


    return (
        <>
            <script type="text/javascript" src="https://code.jquery.com/jquery.min.js"></script>
            <script src="https://markjivko.com/dist/recorder.js"></script>

            {/* ***************** Image Modal ***************** */}

            <div className="modal fade" id="send-image-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="image-form" onSubmit={sendImage}>
                            <div className="modal-body">
                                {(imageError === "miss") ? (<div className="alert alert-danger">Please pick a picture.</div>) : ""}

                                <video ref={videoRef}></video>
                                <canvas ref={photoRef}></canvas>
                                <img style={{ maxWidth: "100%" }} src={image}></img>
                                <button type="button" className="btn btn-secondary" onClick={takePhoto}>take photo</button>
                                <hr className="solid"></hr>
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

            {/* ***************** Voice Modal ***************** */}

            <div className="modal fade" id="send-record-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Voice record</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="voice-form" onSubmit={sendRecord}>
                            <div className="modal-body">
                                {(videoError === "miss") ? (<div className="alert alert-danger">Please record or choos a file.</div>) : ""}
                                <div className="voice-modal" style={{ marginLeft: '-', marginLeft: '-', marginLeft: '0px' }}>
                                    <button className="zoom" type="button" onClick={start_record} style={{ marginBottom: '2%', background: 'url(https://webaudiodemos.appspot.com/AudioRecorder/img/mic128.png)', width: '128px', height: '130px', border: 'none' }} id="satrt_record" />

                                    <div  ><button style={{ width: '100%' }} className="btn btn-danger" type="button" id="stopRecord">Stop</button></div>
                                    <span id="msg"></span>


                                </div>
                                <hr className="solid"></hr>
                                <div style={{ width: '100%' }} id="my_record"></div>


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
            </div >

            {/* ***************** Video Modal ***************** */}


            <div className="modal fade" id="send-video-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="video-form" onSubmit={sendVideo}>
                            <div className="modal-body">
                                {(videoError === "miss") ? (<div className="alert alert-danger">Please upload video.</div>) : ""}

                                <div  ><button style={{ width: '100%' }} className="btn btn-danger" type="button" id="stopRecord">Stop</button></div>

                                <hr className="solid"></hr>
                                <label>Choose a Video&nbsp;</label>
                                <input onChange={readVideo} type="file" accept="video/*" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="close-video-modal" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-success">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >











        </>
    )
}

export default SendModals