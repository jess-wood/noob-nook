import React, {Fragment, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import API from "../../API_Interface/API_Interface";
import {TextField} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import '../Login/Login.css';

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

function updateButton (props) {
    console.log(`Button Access to update user profile`)

    return (
        <Button type="submit" variant="primary">
            Update
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
            console.log("update user effect");
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
    }, [verifyUser, setUser, userName]);

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
        <Grid container justifyContent="flex-start" style={{
            minWidth: '100%',
            minHeight: '100%',
            height: 1500,
            backgroundColor: '#714C7A',
        }}>
            <Typography fontWeight='bold' sx={{mt: 0.5,
                                               mb: 0.5,
                                               textAlign: 'center',
                                               fontFamily: "Jura, Arial"}}
                        variant="h4" className="edit-profile-title">
                Edit Your Profile
            </Typography>


                <Grid item xs={6} sm={6} md={12}>
                    <Box key='usernameProfile' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                        <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#E6E6FA'}}>@{userData.length > 0 ? userData[0]['username'] : 'none'}</Typography>
                    </Box>
                    <TextField id="outlined-basic" label="New Username" variant="outlined" />
                </Grid>

                <Grid item xs={6} sm={6} md={12}>
                    <Box key='usernameEmail' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                        <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#E6E6FA'}}>{userData.length > 0 ? userData[0]['user_email'] : 'none'}</Typography>
                    </Box>
                    <TextField id="outlined-basic" label="New Email" variant="outlined" />
                </Grid>

                <Grid item xs={6} sm={6} md={12}>
                    <Box key='usernamePassword' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                        <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#E6E6FA'}}>{userData.length > 0 ? userData[0]['user_password'] : 'none'}</Typography>
                    </Box>
                    <TextField id="outlined-basic" label="New Password" variant="outlined" />
                </Grid>


                <Grid item xs={4} sm={4} md={4}>
                    <Button variant="outlined" color="success">
                        Save Changes
                    </Button>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                    <Button variant="outlined" color="error">
                        Reset Scores
                    </Button>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                    <Button variant="contained" color="error">
                        Delete Profile
                    </Button>
                </Grid>

        </Grid>
    </Fragment>
};

export default Settings;
