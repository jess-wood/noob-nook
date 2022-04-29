import * as React from 'react';
import {Fragment, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import API from "../../API_Interface/API_Interface";
import {TextField} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import '../Login/Login.css';

import DropzoneDialogExample from "./DropZonePicture";

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
    console.log("in settings");

    const classes = useStyles();
    const [userData, setUserData] = useState([]);
    const {user, setUser, isUserLoggedIn} = props;
    const {verifyUser, setVerifyUser} = useState(false);
    const [userPic, setUserPic] = useState('default.jpg');
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmUserPassword, setConfirmUserPassword] = useState("");

    useEffect(() => {
        const api = new API();

        async function getUserInfo() {
            const userJSONString = await api.userInfo(user);
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

    return <Fragment>
        <Grid container positions='fixed' style={{
            minWidth: '100%',
            minHeight: '100%',
            height: 1000,
            backgroundColor: '#714C7A',
        }}>
            <Container sx={{borderBottom: 1, height: 75, mt: 3, marginLeft: 1}}>
                <Typography fontWeight='bold' sx={{mt: 0.25,
                                                   mb: 0.25,
                                                   textAlign: 'center',
                                                   fontFamily: "Jura, Arial"}}
                            variant="h3" className="edit-profile-title">
                    Edit Your Profile
                </Typography>
            </Container>

            <Grid item key={"UserInfo"} sx={{border: 0, width: '50%', alignItems: 'center', height: '50%'}}>
                <Box key='usernameProfile' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                    <Typography sx={{fontFamily: "Jura, Arial",
                                     fontWeight: 'bold',
                                     fontSize: '20px',
                                     color:'#E6E6FA'}}>
                        @{userData.length > 0 ? userData[0]['username'] : 'none'}
                    </Typography>
                </Box>
                <TextField id="outlined-basic" label="New Username" variant="outlined" />

                <Box key='usernameEmail' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                    <Typography sx={{fontFamily: "Jura, Arial",
                                     fontWeight: 'bold',
                                     fontSize: '20px',
                                     color:'#E6E6FA'}}>
                        {userData.length > 0 ? userData[0]['user_email'] : 'none'}
                    </Typography>
                </Box>
                <TextField id="outlined-basic" label="New Email" variant="outlined" />

                <Box key='usernamePassword' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                    <Typography sx={{fontFamily: "Jura, Arial",
                                     fontWeight: 'bold',
                                     fontSize: '20px',
                                     color:'#E6E6FA'}}>
                        {userData.length > 0 ? userData[0]['user_password'] : 'none'}
                    </Typography>
                </Box>
                <TextField id="outlined-basic" label="New Password" variant="outlined" />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
                <Button variant="outlined" color="success">
                    Save Changes
                </Button>

                <Button variant="outlined" color="error">
                    Reset Scores
                </Button>

                <Button variant="contained" color="error">
                    Delete Profile
                </Button>
            </Grid>
        </Grid>
    </Fragment>
};

export default Settings;
