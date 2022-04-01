import './App.css';
import React, { useState } from 'react';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import MainPage from './mainPage/MainPage';
import DataBase from './database/DataBase';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function App() {
  


return (
  // <div className="App">
  //   {(user.username != "") ? (
  //     <div className="welcome">
  //       <button onClick={logout}>Logout</button>
  //     </div>
  //   ) : (
  //     <LoginForm Login={Login} error={error} />
  //   )}

  // </div>

 
  <Router>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/register' element={<RegisterForm/>}/>
      <Route path='/main' element={<MainPage/>}/>
    </Routes>
  </Router>




);
}

export default App;
