import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Login/Login.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TopBar from "../Navigations/TopBar";
import GamesCatalog from "../GamesPages/GamesCatalog";
import UserProfile from "../UserProfile/UserProfile";
import Settings from "../Settings/Settings";
import {Fragment} from "react";

const Dashboard = (props) => {
    console.log("in dashboard")
    return (
        <Fragment>
            <h1>Dashboard</h1>
        </Fragment>
    )
}

export default Dashboard;

// <Router>
//     <TopBar />
//     <Routes>
//         <Route path='/' exact element={Dashboard} />
//         <Route path='/games' element={GamesCatalog} />
//         <Route path='/profile' element={UserProfile} />
//         <Route path='/settings' element={Settings} />
//     </Routes>
// </Router>