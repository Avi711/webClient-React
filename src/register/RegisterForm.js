import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Contacts from '../database/Contacts';
import tempUsers from '../database/DataBase';




function RegisterForm() {


    const [details, setDetails] = useState({ displayname: "", username: "", password: "", repassword: "" });
    const [image, setImage] = useState("profile2.png")
    const [error, setError] = useState("");
    const imageRef = useRef();


    function photo(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }


    function validate() {
        if (details.username === "" || details.password === "" || details.displayname === "") {
            setError("miss");
            return -1;
        }
        if (details.password.length < 8) {
            setError("length");
            return -1;
        }
        for (let i of tempUsers) {
            if (details.username.toLowerCase() === i.username.toLowerCase()) {
                setError("yes");
                return -1;
            }
        }

        if (details.password.search(/[a-z]/i) < 0) {
            setError("letter");
            return -1;
        }
        if (details.password.search(/[0-9]/) < 0) {
            setError("digit");
            return -1;
        }

        if(details.password != details.repassword) {
            setError("match");
            return -1;
        }

        return 0;


    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (validate() == -1)
            return;

        setError("no")
        var obj = {
            username: details.username,
            password: details.password,
            displayname: details.displayname,
            image: image
        }
        var newContact = {
            username: details.username,
            userContacts: []
        }
        tempUsers.push(obj);
        Contacts.push(newContact);
    }


    return (
        <>
            <div className="row background">
                <span className="logo"><img width="200" src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></span>
            </div>
            <div className="row my_form center">
                <span className="title">Register to webClient</span>

                <form onSubmit={onSubmit} className="login-register-form">
                    {(error === "no") ? (<div className="alert alert-success">Registered succefully, please login.</div>) : ""}
                    {(error === "yes") ? (<div className="alert alert-danger">Username already in use, please choose another one.</div>) : ""}
                    {(error === "miss") ? (<div className="alert alert-danger">Please fill in all the details.</div>) : ""}
                    {(error === "length") ? (<div className="alert alert-danger">Password should contain at least 8 characters.</div>) : ""}
                    {(error === "letter") ? (<div className="alert alert-danger">Your password must contain at least one letter.</div>) : ""}
                    {(error === "digit") ? (<div className="alert alert-danger">Your password must contain at least one digit..</div>) : ""}
                    {(error === "match") ? (<div className="alert alert-danger">Passwords don't match</div>) : ""}

                    <div className="form-floating mb-3">
                        <input className="form-control login-register-form" id="floatingInput" placeholder="name@example.com" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username}></input>
                        <label>Username</label>
                        <div id="emailHelp" className="form-text">We'll never share your details with anyone else.</div>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control login-register-form" id="floatingPassword" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}></input>
                        <label>Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control login-register-form" id="floatingPassword" placeholder="Password" onChange={e => setDetails({ ...details, repassword: e.target.value })} value={details.repassword}></input>
                        <label>Confirm password</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input className="form-control login-register-form" id="floatingPassword" placeholder="Password" onChange={e => setDetails({ ...details, displayname: e.target.value })} value={details.displayname}></input>
                        <label>Display name</label>
                    </div>

                        <label style={{marginTop: '0.5rem'}}>Choose a profile picture: (Optional)&nbsp;</label>
                        {(image !== 'profile2.png') ? <img onClick={() => {setImage("profile2.png")}} src={image} className="register-image-button profile-image"></img> :
                            <button onClick={(e) => { e.preventDefault(); imageRef.current.click(); }} className='register-image-button'>Add Image</button>}
                        <input ref={imageRef} style={{ display: 'none' }} onChange={photo} type="file"
                            id="profile_pic" name="profile_pic"
                            accept="image/png, image/jpeg" />
                    <button type="submit" className="btn webButton">Register</button>
                    <hr></hr>
                    <span className='center-text'>Already register? <Link to="/">click here</Link> to login.</span>
                </form>
            </div>

        </>
    )
}

export default RegisterForm