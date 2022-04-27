import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack';
import '../Login/Login.css';
import Container from '@mui/material/Container'
import {Fragment} from "react";
import {CssBaseline} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardMedia} from "@mui/material";
import {testHighScores} from "../UserProfile/UserProfile";
import image from '../UserProfile/UsersPictures/slick_doe.jpg';


const testUser = [
    {
        username: 'slick_doe',
        posts: ['@slick_doe beat their highscore in Lights Out!']

    }
];

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

const UsernameHeader = (props) => {
    return (
        <Container sx={{borderBottom: 1, height: 75, mt: 3, marginLeft: 1}}>
            <Typography fontWeight='bold' fontSize='35px' sx={{fontFamily: 'Jura, Arial'}} color='#E7DECC'>
                Welcome "username"!
            </Typography>
        </Container>
    );
}

function UserDataEntry (props) {
    return (
        <Grid container sx={{
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
            <Box display='flex' flexDirection='row' justifyContent='left' sx={{height: '100%', width: '30%', borderRight: 1.5, borderColor: '#4fc3f7'}}>
                    <Card key={"profilePic"} sx={{width: '40%', height: '80%', borderRadius: '50%',  border: 1, mt: 1, marginLeft: 1}}>
                        <CardMedia style={{width: '100%', height: '100%', justifySelf: 'center'}} image={require('../UserProfile/UsersPictures/slick_doe.jpg')} title={"profilePic"}/>
                    </Card>
                <Box key="userName" sx={{height:'30%', width:'80%', marginLeft: 1}}>
                    <Typography fontSize='16px' sx={{fontFamily: "Jura, Arial", mt: 4}}>
                        {props.account[0].username}
                    </Typography>
                </Box>
            </Box>
            <Box display='flex' flexDirection='row' justifyContent='center' sx={{marginLeft: 2}}>
                <Typography fontSize='16px' sx={{fontFamily: "Jura, Arial", mt: 4}}>
                    {props.account[0].posts[0]}
                </Typography>
            </Box>
        </Grid>
    );
}

function ActivityFeed (props) {
    return (
        <Box sx={{height: 1300, mt: -7}}>
            <Typography fontWeight='bold' fontSize='25px' sx={{textAlign: 'center', fontFamily: "Jura, Arial", mb: 2}} color='#E7DECC'>
                FOLLOWED USERS ACTIVITY
            </Typography>
            <Box sx={{
                minWidth: '100%',
                height: '95%',
                border: 1,
                padding: 1,
                backgroundColor: '#946aa6'
            }}>
                <UserDataEntry account={testUser}/>
            </Box>
        </Box>
    )
}

function UserHighScores (props) {
    return (
        <Box sx={{height: 400, width: 350, marginLeft: 1, mb: 4, border: 1, backgroundColor: '#946aa6', overflowY: 'scroll'}}>
            <Box display='flex' flexDirection='row' justifyContent='center' sx={{borderBottom: 1}}>
                <Typography fontWeight='bold' fontSize='25px' sx={{mt: 0.5, mb: 0.5, textAlign: 'center', fontFamily: "Jura, Arial"}} color='#E7DECC'>
                    YOUR HIGH SCORES:
                </Typography>
            </Box>
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
                {
                    props.highScores.map(game =>
                        <Box display='flex' flexDirection='row' justifyContent='center' sx={{marginBlock: 3, mt: 3}}>
                            <Typography fontSize='20px' sx={{textAlign: 'center', fontFamily: "Jura, Arial"}} color='#f8f0e3'>
                                {game.game}: {game.score}
                            </Typography>
                        </Box>
                    )
                }
            </Stack>
        </Box>
    )
}

function OtherUsersHighScores (props) {
    return (
        <Box sx={{height: 400, width: 350, marginLeft: 1, mb: 4, border: 1, backgroundColor: '#946aa6', overflowY: 'scroll'}}>
            <Box display='flex' flexDirection='row' justifyContent='center' sx={{borderBottom: 1}}>
                <Typography fontWeight='bold' fontSize='25px' sx={{mt: 0.5, mb: 0.5, textAlign: 'center', fontFamily: "Jura, Arial"}} color='#E7DECC'>
                    FRIENDS' HIGH SCORES:
                </Typography>
            </Box>
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
                {
                    props.highScores.map(game =>
                        <Box display='flex' flexDirection='row' justifyContent='center' sx={{marginBlock: 3, mt: 3}}>
                            <Typography fontSize='20px' sx={{textAlign: 'center', fontFamily: "Jura, Arial"}} color='#f8f0e3'>
                                {game.game}: {game.score}
                            </Typography>
                        </Box>
                    )
                }
            </Stack>
        </Box>
    )
}

function HighScoreSideBar (props) {
    return (
        <Stack>
            <Box sx={{mb: 5}}>
                <OtherUsersHighScores highScores={testHighScores}/>
            </Box>
            <Box>
                <UserHighScores highScores={testHighScores}/>
            </Box>
        </Stack>
    )
}

const Dashboard = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            <Grid container positions='fixed' style={{
                minWidth: '100%',
                minHeight: '100%',
                height: 1500,
                backgroundColor: '#714C7A',
            }}>
                <CssBaseline/>
                <Box >
                    <UsernameHeader/>
                </Box>
                <Grid container item spacing={20} sx={{

                }}>
                    <Grid item className={classes.item}>
                        <HighScoreSideBar/>
                    </Grid>
                    <Grid item className={classes.item}>
                        <ActivityFeed />
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Dashboard;