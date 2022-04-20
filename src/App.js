import logo from './logo.svg';
import './App.css';
import React, {Fragment, useState} from "react";
import EntryPage from './Pages/Login/Login'
import { useEffect } from 'react';
//import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from './Pages/Settings/Settings';
import UserProfile from "./Pages/UserProfile/UserProfile";
import GamesCatalog from "./Pages/GamesPages/GamesCatalog";
import TopBar from "./Pages/Navigations/TopBar";
import {Grid} from "@mui/material";

const logout = (setUser) => {
    console.log("in logout");
    return () => {
        setUser(undefined);
    }
};

let username = '';

function App() {
    //test var, change to false to see login, true to see topbar and other pages
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState(undefined);
    //const [username, setUsername] = useState(undefined);
    if (user !== undefined){
        console.log(user['username']);
        username = user.username;
        console.log(username);
    }
    console.log(user);
  return (
      <Fragment>
          {user !== undefined ? <TopBar logout={logout(setUser)} user={username}/> : <EntryPage user={user} setUser={setUser}/>}
      </Fragment>
  );
}

export default App;


// <div className={'myDiv'}>
//     <Router>
//         <TopBar />
//         <Routes>
//             <Route exact path='/' element={<Login/>} />
//             <Route path='/games' element={<GamesCatalog/>} />
//             <Route path='/dashboard' element={<Dashboard/>} />
//             <Route path='/profile' element={<UserProfile/>} />
//             <Route path='/settings' element={<Settings/>} />
//         </Routes>
//     </Router>
// </div>
