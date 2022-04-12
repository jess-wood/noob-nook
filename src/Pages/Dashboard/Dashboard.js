import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack';
import '../Login/Login.css';
//import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TopBar from "../Navigations/TopBar";
import GamesCatalog from "../GamesPages/GamesCatalog";
import UserProfile from "../UserProfile/UserProfile";
import Settings from "../Settings/Settings";
import {Fragment} from "react";
import {CssBaseline} from "@mui/material";

const UsernameHeader = (props) => {
    return (
        <h1>Welcome "usernam"!</h1>
    );
}

const SideBarComponent = (props) => {
    return (
        <Box sx={{marginBlock: 3}}>
            <h3>Test</h3>
        </Box>
    )
}

function UserDataEntry (props) {
    return (
        <Box sx={{
            width: 800,
            height: 100,
            backgroundColor: '#b3e5fc',
            '&:hover': {
                backgroundColor: '#b3e5fc',
                opacity: [0.9, 0.8, 0.7],
            },
            border: 2,
            borderColor: '#4fc3f7'
        }}>

        </Box>
    );
}

function SideBar (props) {
    return (
        <Stack divider={<Divider orientation="horizontal" flexItem />} sx={{marginLeft: 5}}>
            <SideBarComponent/>
            <SideBarComponent/>
            <SideBarComponent/>
        </Stack>
    )
}

const Dashboard = (props) => {
    console.log("in dashboard")
    return (
        <Fragment>
            <CssBaseline/>
            <Box>
                <UsernameHeader/>
            </Box>
            <Grid container spacing={20} alignItems='center'>
                <Grid item>
                    <SideBar/>
                </Grid>
                <Grid item alignContent='center' alignItems='center'>
                    <UserDataEntry/>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Dashboard;