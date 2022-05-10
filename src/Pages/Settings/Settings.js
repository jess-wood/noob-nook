import * as React from 'react';
import {Fragment, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Card, CardMedia, Grid} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import API from "../../API_Interface/API_Interface";
import {TextField} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import '../Login/Login.css';

import DropzoneDialogExample from "./DropZonePicture";
import DropZone from "./DropZonePicture";
import highScoresTableAttributes from '../Dashboard/Dashboard.js';
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
    container: {
        border: '4px solid green',
        display: 'inline-flex',
    },
    item: {
        border: '1px',
        display: 'inline-flex',
        borderRadius: '30px'
    }
}));

/*
function updateButton (props) {
    console.log(`Button Access to update user profile`)

    return (
        <Button variant="outlined" color="success">
            Save Changes
        </Button>
    );
}

function resetScoresButton (props) {
    console.log(`Button Access to reset user's scores`)

    return (
        <Button variant="outline-danger">
            Reset Scores
        </Button>
    );
}

function DeleteButton (props) {
    console.log(`Button Access to delete profile`)

    return (
        <Button variant="danger">
            Delete Profile
        </Button>
    );
}
*/

const Settings = (props) => {
    const classes = useStyles();
    const [userData, setUserData] = useState([]);
    const {user, setUser, isUserLoggedIn, clickCallback} = props;
    const {verifyUser, setVerifyUser} = useState(false);
    const [userPic, setUserPic] = useState('default.jpg');
    const [firstName, setFirstName] = useState ("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmUserPassword, setConfirmUserPassword] = useState("");

    useEffect(() => {
        const api = new API();

        async function getUserInfo() {
            const userJSONString = await api.userInfo(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(userJSONString)}`);
            setUserData(userJSONString.data);
            api.getUserInfo(userName, userEmail, userPassword)
                .then( userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                    const user = userInfo.user;
                    if( userInfo.status === "OK" ) {
                        setUser(user);
                    }
                });
        }

        getUserInfo();
    }, [user]);

    const submitHandler = (event) => {
        event.preventDefault();

        const api = new API();
        async function updateUserInfo() {
            api.getUserInfo(userName, userEmail, userPassword)
                .then(userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                    const user = userInfo.user;
                    if (userInfo.status === "OK") {
                        setUser(user);
                    }
                });
        }
        updateUserInfo();
    }

    function resetScoresCallback () {
        const api = new API;
        async function resetAllHighScores() {
            const highScoresJSONString = await api.resetHighScores(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(highScoresJSONString)}`);
        }
        resetAllHighScores();
    }

    function deleteProfileCallback () {
        const api = new API;
        async function deleteProfile () {
            const profileJSONString = await api.deleteProfile(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(profileJSONString)}`);
        }
        deleteProfile();
        clickCallback();
    }

    return <Fragment>
        <Grid container positions='fixed' columns={2} style={{
            minWidth: '100%',
            minHeight: '100%',
            height: 1000,
            backgroundColor: '#714C7A',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        }}>
            <Container sx={{borderBottom: 1, height: 75, mt: 1, marginLeft: 2, width: '35%'}}>
                <Typography fontWeight='bold' sx={{mt: 0.25,
                                                   mb: 0.25,
                                                   textAlign: 'start',
                                                   fontFamily: "Jura, Arial", color: '#E6E6FA'}}
                            variant="h3" className="edit-profile-title">
                    Edit Your Profile
                </Typography>
            </Container>

                <Grid item key={"UserProfilePic"} sx={{border: 0, width: '20%', alignItems: 'center', height: '30%', marginLeft: '37%', mt: 3}}>
                    <DropZone userData={userData}/>
                </Grid>
                <Grid item key={"UserInfo"} sx={{border: 0, width: '100%', alignItems: 'center', height: '45%', flexDirection: 'column', mt:1}}>
                    <Stack direction={'row'} spacing={'0%'} sx={{marginLeft: '10%'}}>
                    <Box key='userFirstName' sx={{border: 0, mt: 1, width: '50%', marginLeft: 1}}>
                        <Stack direction={'row'} spacing={'22%'}>
                        <Typography sx={{fontFamily: "Jura, Arial",
                            mt: 2,
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color:'#E6E6FA'}}>
                            First Name:&nbsp;
                            <Typography sx={{textDecoration: 'underline',
                                fontFamily: "Jura, Arial",
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color:'#E6E6FA'}} display="inline">
                                {userData.length > 0 ? userData[0]['user_fName'] : 'none'}</Typography>
                        </Typography>
                        <TextField sx={{mb: 3}} id="standard-basic" label="New First Name" variant="standard" />
                        </Stack>
                    </Box>

                    <Box key='userLastName' sx={{border: 0, mt: 2, width: 'fit-content', marginLeft: 1, height:'5%'}}>
                        <Stack direction={'row'} spacing={18}>
                        <Typography sx={{fontFamily: "Jura, Arial",
                            mt: 3,
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color:'#E6E6FA'}}>
                            Last Name:&nbsp;
                            <Typography sx={{textDecoration: 'underline',
                                fontFamily: "Jura, Arial",
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color:'#E6E6FA'}} display="inline">
                                {userData.length > 0 ? userData[0]['user_lName'] : 'none'}</Typography>
                        </Typography>
                        <TextField style={{marginTop: 5}} id="standard-basic" label="New Last Name" variant="standard" />
                        </Stack>
                    </Box>
                    </Stack>

                    <Stack direction={'row'} spacing={'0.7%'} sx={{marginLeft: '10%', mt: 4}}>
                    <Box key='usernameProfile' sx={{border: 0, mt: 1, width: '50%', marginLeft: 1}}>
                        <Stack direction={'row'} spacing={'5%'}>
                        <Typography sx={{fontFamily: "Jura, Arial",
                                        mt: 3,
                                         fontWeight: 'bold',
                                         fontSize: '20px',
                                         color:'#E6E6FA'}}>
                            Username:&nbsp;
                            <Typography sx={{textDecoration: 'underline',
                                fontFamily: "Jura, Arial",
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color:'#E6E6FA'}} display="inline">
                                @{userData.length > 0 ? userData[0]['username'] : 'none'}</Typography>
                        </Typography>
                        <TextField style={{marginTop: 5}} id="standard-basic" label="New Username" variant="standard" />
                        </Stack>
                    </Box>

                    <Box key='usernameEmail' sx={{border: 0, mt: 1, width: '50%', marginLeft: 1}}>
                        <Stack direction={'row'} spacing={'13%'} sx={{border:0, width:'100%'}}>
                        <Typography sx={{fontFamily: "Jura, Arial",
                                        mt: 3,
                                         fontWeight: 'bold',
                                         fontSize: '20px',
                                         color:'#E6E6FA'}}>
                            Email:&nbsp;
                            <Typography sx={{textDecoration: 'underline',
                                fontFamily: "Jura, Arial",
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color:'#E6E6FA'}} display="inline">
                                {userData.length > 0 ? userData[0]['user_email'] : 'none'} </Typography>
                        </Typography>
                        <TextField style={{marginTop: 5}} id="standard-basic" label="New Email" variant="standard" />
                        </Stack>
                    </Box>
                    </Stack>

                    <Stack direction={'row'} spacing={'4%'} sx={{marginLeft: '10%', mt: 5, border:0, alignItems:'end'}}>
                    <Box key='usernamePassword' sx={{border: 0, mt: 1, width: '50%', marginLeft: 1}}>
                        <Stack direction={'row'} spacing={'20%'}>
                        <Typography sx={{fontFamily: "Jura, Arial",
                                        mt: 3,
                                         fontWeight: 'bold',
                                         fontSize: '20px',
                                         color:'#E6E6FA'}}>
                            Password:&nbsp;&nbsp;
                            <Typography sx={{textDecoration: 'underline',
                                             fontFamily: "Jura, Arial",
                                             fontWeight: 'bold',
                                             fontSize: '20px',
                                             color:'#E6E6FA'}} display="inline">
                                             {userData.length > 0 ? userData[0]['user_password'] : 'none'} </Typography>
                        </Typography>
                        <TextField style={{marginTop: 5}} id="standard-basic" label="New Password" variant="standard" />
                        </Stack>
                    </Box>
                        <Button onClick={resetScoresCallback} sx={{width: '30%', height: '5%', mt: '5%', backgroundColor: '#b3e5fc', borderColor: '#4fc3f7', color: '#8b0000', '&:hover': {
                                backgroundColor: '#b3e5fc',
                                opacity: [0.9, 0.8, 0.9],
                            },}} >
                            Reset Scores
                        </Button>
                    </Stack>

                    <Grid item key={"Buttons"} columns={2} sx={{border: 0, width: '100%', alignItems: 'center', height: '30%', flexDirection:'column', mt: 12}}>
                        <Box key='Buttons' sx={{border: 0, mt: 1, width: '100%', marginLeft: 1}}>
                            <Stack direction={'row'} spacing={25} sx={{border:0, width:'100%'}}>
                            <Button variant="contained" color="success" sx={{width: '30%', height: '5%', marginLeft:'10%', backgroundColor: '#03c04a', color: 'black'}}>
                                Save Changes
                            </Button>

                            <Button onClick={deleteProfileCallback} variant="contained" color="error" sx={{width: '30%', height: '5%', marginLeft:'5%'}}>
                                Delete Profile
                            </Button>
                            </Stack>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
    </Fragment>
};

export default Settings;
