import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import tempUsers from '../database/DataBase';




function RegisterForm() {


    const [details, setDetails] = useState({ displayname: "", username: "", password: "" });
    const [error, setError] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if(details.username === "" || details.password === "" || details.displayname === "") {
            setError("miss");
            return;
        }
        for (let i of tempUsers) {
            if (details.username === i.username) {
                setError("yes");
                return;
            }
        }
        setError("no")
        var obj = {
            username: details.username,
            password: details.password,
            displayname: details.displayname,
          }
        tempUsers.push(obj); 
    };



    return (
        <>
            <div className="row background">
                <span className="logo"><img width="200" src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></span>
            </div>
            <div className="row my_form center">
                <span className="title">Register to webClient</span>
                <form onSubmit={onSubmit}>
                     {(error === "no") ? (<div className="alert alert-success">Registered succefully, please login</div>) : ""}
                     {(error === "yes") ? (<div className="alert alert-danger">Username already in use, please choose another one</div>) : ""}
                     {(error === "miss") ? (<div className="alert alert-danger">Please fill in all the details</div>) : ""}
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username}></input>
                        <label>Username</label>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}></input>
                        <label>Password</label>
                    </div>
                    <br></br>
                    <div className="form-floating">
                        <input className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setDetails({ ...details, displayname: e.target.value })} value={details.displayname}></input>
                        <label>Display name</label>
                    </div>
                    <br></br>
                    <button type="submit" className="btn webButton">Register</button>
                    <span className="margin_left">Already register? <Link to="/">click here</Link> to login.</span>
                </form>
            </div>

        </>
    )
}

export default RegisterForm