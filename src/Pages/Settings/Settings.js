//import * as React from 'react';
/* eslint-disable */
import React, {useCallback, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Login/Login.css';

const Settings = (props) => {
    console.log("in settings");

    const [profilePic, setProfilePic] = useState();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmUserPassword, setConfirmUserPassword] = useState("");

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.currentUserLoggedIn);
    const {loading, error, userInfo} = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            setUserName(userInfo.userName);
            setUserEmail(userInfo.userEmail);
        }
    }, [history, userInfo]);

    const submitHandler = (event) => {
        event.preventDefault();

        dispatch(userRegister({userName, userEmail, userPassword}));
    };

    return (
        <div className="settings-page">
            <form onSubmit={submitHandler}>
                <form.Group controlId="FormUserName">
                    <form.Label>Username</form.Label>
                        <form.Control
                            type="userName"
                            value={userName}
                            placeholder="Enter new username"
                            onChange={(event) => setUserName(event.target.value)}
                            />
                </form.Group>

                <form.Group controlId="FormUserEmail">
                    <form.Label>email</form.Label>
                    <form.Control
                        type="userEmail"
                        value={userEmail}
                        placeholder="Enter new email"
                        onChange={(event) => setUserEmail(event.target.value)}
                    />
                </form.Group>

                <form.Group controlId="FormUserPassword">
                    <form.Label>Password</form.Label>
                    <form.Control
                        type="userPassword"
                        value={userPassword}
                        placeholder="Enter new password"
                        onChange={(event) => setUserPassword(event.target.value)}
                    />
                </form.Group>

                <form.Group controlId="confirmPassword">
                    <form.Label>Confirm Password</form.Label>
                    <form.Control
                        type="confirmUserPassword"
                        value={confirmUserPassword}
                        placeholder="Please confirm your password"
                        onChange={(event) => setConfirmUserPassword(event.target.value)}
                    />
                </form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>
                <Button variant="outline-danger">
                    Reset Scores
                </Button>
                <Button variant="danger">
                    Delete Account
                </Button>
            </form>
        </div>

    );
};

export default Settings;