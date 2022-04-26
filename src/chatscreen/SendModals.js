import { useState, useRef, useEffect } from "react"
import React from 'react'


function SendModals(props) {
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [videoError, setVideoError] = useState("");
    const [record, setRecord] = useState("");
    const [imageError, setImageError] = useState("");
    const [recorderror, setRecordError] = useState("");


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
        document.getElementById("image-form").reset();
        document.getElementById("video-form").reset();
        document.getElementById("voice-form").reset();
        document.getElementById('video-output').innerHTML = "";
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
        props.chatUserObj.time = time.getTime();
        setTimeout(() => { document.getElementById(props.chatUserObj.contactName).click(); }, 10);
        document.getElementById("close-video-modal").click();
        document.getElementById("close-record-video-modal").click();
        props.setInputText(!props.inputText)
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
        props.chatUserObj.time = time.getTime();
        setTimeout(() => { document.getElementById(props.chatUserObj.contactName).click(); }, 10);
        props.setInputText(!props.inputText)
        document.getElementById("close-image-modal").click();
    }


    // function getVideo() {
    //     let video = props.videoRef.current;
    //     navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 } }).then(stream => {
    //         video.srcObject = stream;
    //         video.play();
    //     }).catch(err => { console.error(err); })
    // }
    // useEffect(() => { getVideo(); }, [props.videoRef]);



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

                document.getElementById('stop-record').onclick = () => {
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
        props.chatUserObj.time = time.getTime();
        setTimeout(() => { document.getElementById(props.chatUserObj.contactName).click(); }, 10);
        props.setInputText(!props.inputText)
        document.getElementById("close-record-modal").click();
        setRecord("")
    }


    function takePhoto() {
        document.getElementById('capture-image').style.display = 'none';
        document.getElementById('retake-image').style.display = 'block';
        const width = 414;
        const height = 414 / (16 / 9);
        let video = props.videoRef2.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setImage(photo.toDataURL());
        document.getElementById("send-image-modal").addEventListener('hidden.bs.modal', () => {
            document.getElementById('capture-image').style.display = 'block';
            document.getElementById('retake-image').style.display = 'none';
        });



    }

    function retakePhoto() {
        document.getElementById('capture-image').style.display = 'block';
        document.getElementById('retake-image').style.display = 'none';
        setImage("");

    }

    function recordVideo() {
        document.getElementById('stop-record-video').style.display = 'block';
        document.getElementById('start-record-video').style.display = 'none';
        document.getElementById('video-record-form').reset();
        setVideoError("");

        document.getElementById('video-output').innerHTML = "";
        var video = props.videoRef.current;
        var parts = []
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                document.getElementById("record-video-modal").addEventListener('hidden.bs.modal', () => {
                    document.getElementById('video-record-form').reset();
                    document.getElementById('stop-record-video').click();
                    stream.getTracks().forEach(track => track.stop())
                })
                video.srcObject = stream;
                video.play();
                video.volume = 0;
                var mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start(1000);
                mediaRecorder.ondataavailable = (e) => { parts.push(e.data) };
                document.getElementById("stop-record-video").onclick = () => {
                    document.getElementById('stop-record-video').style.display = 'none';
                    document.getElementById('start-record-video').style.display = 'block';
                    document.getElementById('video-output').innerHTML = "";
                    const blob = new Blob(parts, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    var video = document.createElement('video');
                    video.controls = true;
                    video.src = url;
                    setVideo(video.src);
                    document.getElementById('video-output').appendChild(video);

                };
            })
        }
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

                                {/* <video ref={props.videoRef}></video>  */}
                                <canvas style={{ display: 'none' }} ref={photoRef}></canvas>
                                <img style={{ maxWidth: "100%" }} src={image}></img>
                                {/* <button type="button" className="btn btn-secondary" onClick={takePhoto}>take photo</button> */}
                                {(image == "") ? "" : <hr className="solid"></hr>}
                                <label>Choose a picture from you device: &nbsp;</label>
                                <input id="image-input" onChange={photo} type="file" accept="image/png, image/jpeg" />
                                <div className="separator">Or</div>
                                <video ref={props.videoRef2} width={500} height={270}></video>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <button type="button" id="capture-image" onClick={takePhoto} className="btn btn-danger">Capture</button>
                                    <button type="button" id="retake-image" onClick={retakePhoto} className="btn btn-danger" style={{ display: 'none' }}>Retake</button>
                                </div>
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
                                    <div  ><button style={{ width: '100%' }} className="btn btn-danger" type="button" id="stop-record">Stop</button></div>
                                    <span id="msg"></span>
                                </div>
                                <br></br>
                                <div style={{ width: '100%' }} id="my_record"></div>
                                <div className="separator">Or</div>


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

                                {/* <div  ><button style={{ width: '100%' }} className="btn btn-danger" type="button" id="stopRecord">Stop</button></div> */}
                                {(video == "") ? "" : <video src={video} controls></video>}
                                {(video == "") ? "" : <hr className="solid"></hr>}
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




            {/* ***************** Record video or take photo Modal ***************** */}

            <div className="modal fade" id="record-video-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Record video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="video-record-form" onSubmit={sendVideo}>
                            <div className="modal-body">
                                {(videoError === "miss") ? (<div className="alert alert-danger">Please Record video or upload one.</div>) : ""}
                                <label>Choose a Video&nbsp;</label>
                                <input onChange={readVideo} type="file" accept="video/*" />
                                <div className="separator">Or</div>


                                <video ref={props.videoRef} width={500} height={270}></video>

                                <img style={{ maxWidth: "100%" }} src={image}></img>
                                <hr className="solid"></hr>
                                <div id="video-output"></div>
                                {/* <canvas ref={photoRef}></canvas> */}
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    {/* <button type="button" onClick={takePhoto} className="btn btn-secondary">Capture</button> */}
                                    <button type="button" id="start-record-video" onClick={recordVideo} className="btn btn-danger">Record</button>
                                    <button type="button" id="stop-record-video" className="btn btn-danger" style={{ display: 'none' }}>Stop</button>
                                </div>
                                {(image == "") ? "" : <hr className="solid"></hr>}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="close-record-video-modal" data-bs-dismiss="modal">Close</button>
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