import './App.css';
import React, { useState } from 'react';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import MainPage from './mainPage/MainPage';
import DataBase from './database/DataBase';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  
  const [curUser, setcurUser] = useState("");
  

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
        <Route path='/' element={<LoginForm user={setcurUser} />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/main' element={<MainPage curUser={curUser} />} />
      </Routes>
    </Router>


  );
}

export default App;
