import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import tempUsers from '../database/DataBase';

function LoginForm(props) {

    const [details, setDetails] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    let navigate = useNavigate();


    const Login = details => {
        if(details.username == "" || details.password == "") {
            setError("miss");
            return;
        }
        for (let i of tempUsers) {
          if (details.username == i.username && details.password == i.password) {
            props.user(details.username)
            setError("no");
            navigate("/main");
            return;
          }
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

    return (
        <>
            <div className="row background">
                <span className="logo"><img width="200" src="e98bf552a7aa412d8db10a55a3416a4d-removebg-preview.png"></img></span>
            </div>
            <div className="row my_form center">
                <span className="title">Log in to webClient</span>
                <form onSubmit={onSubmit}>
                    {(error == "yes") ? (<div className="alert alert-danger">Username or Password incorrect</div>) : ""}
                    {(error == "miss") ? (<div className="alert alert-danger">Please fill in all the details</div>) : ""}
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username}></input>
                        <label >Username</label>
                        <div id="emailHelp" className="form-text">We'll never share your details with anyone else.</div>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}></input>
                        <label >Password</label>
                    </div>
                    <br></br>
                    <input type="submit" className="btn webButton" value="Login"></input>
                    <span className="margin_left">Not registerd? <Link to="/register">click here</Link> to register.</span>

                </form>
            </div>
        </>
    )
}

export default LoginForm