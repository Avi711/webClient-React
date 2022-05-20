import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import tempUsers from '../database/DataBase';
import axios from 'axios';
import {myServer} from '../server';

function LoginForm(props) {

    const [details, setDetails] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    let navigate = useNavigate();


    async function Login() {
        if (details.username == "" || details.password == "") {
            setError("miss");
            return;
        }
        for (let i of tempUsers) {
            // if (details.username.toLowerCase() == i.username.toLowerCase() && details.password == i.password) {
            props.user(details.username.toLowerCase())
            setError("no");
            const loged = await serverLogin({ Username: details.username, Password: details.password });
            if (loged == -2) {
                setError("server-down")
                return;
            }
            if (loged == -1) {
                setError("yes")
                return;
            }
            getUser().then(i => {localStorage.setItem('user-image', i)});
            localStorage.setItem('user', details.username.toLowerCase());
            navigate("/main");
            return;
            //   }
        }
        setError("yes")
    }

    const logout = () => {
        //setUser({ username: "", password: "" });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        Login(details);
    };

    async function serverLogin(obj) {
        // const res = await fetch('https://localhost:44306/api/Login', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(obj),
        // });
        // const data = await res.json();
        // console.log(data.token);
        // return res.status;

        var status = 0;

        await axios.post(`${myServer}/api/Login`, obj)
            .then(res => {
                localStorage.setItem('token', res.data);
            })
            .catch(err => {
                if(err.response.status == 400)
                    status = -1;
                else 
                    status = -2;
            })
        return status;
    }

    async function getUser() {
        const res = await fetch(`${myServer}/api/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
        });
        const data = await res.json();
        return data.image;
    }


    return (
        <>
            <div className="row background">
                <span className="logo"><img width="200" src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></span>
            </div>
            <div className="row my_form center">
                <span className="title">Log in to webClient</span>
                <form onSubmit={onSubmit} className="login-register-form">
                    {(error == "yes") ? (<div className="alert alert-danger">Username or Password incorrect</div>) : ""}
                    {(error == "miss") ? (<div className="alert alert-danger">Please fill in all the details</div>) : ""}
                    {(error === "server-down") ? (<div className="alert alert-danger">Can't connect to server</div>) : ""}
                    <div className="form-floating mb-3">
                        <input className="form-control login-register-form" id="floatingInput" placeholder="name@example.com" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username}></input>
                        <label >Username</label>
                        <div id="emailHelp" className="form-text">We'll never share your details with anyone else.</div>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control login-register-form" id="floatingPassword" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}></input>
                        <label >Password</label>
                    </div>
                    <br></br>
                    <input type="submit" className="btn webButton" value="Login"></input>
                    <hr></hr>
                    <span className="center-text">Not registerd? <Link to="/register">click here</Link> to register.</span>
                </form>

            </div>

        </>
    )
}

export default LoginForm