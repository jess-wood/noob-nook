import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import '../Login/Login.css';
import Container from '@mui/material/Container'
import {Fragment} from "react";
import {CssBaseline} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardMedia} from "@mui/material";
import {testHighScores} from "../UserProfile/UserProfile";
import {useState, useEffect} from "react";
import API from '../../API_Interface/API_Interface';


const testUser = [
    {
        username: 'slick_doe',
        post_content: ['@slick_doe beat their high score in Lights Out!']

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

const highScoresTableAttributes = [
    {
        attributeName: 'Matching Scramble',
        attributeDBName: 'HS_matching',
    },
    {
        attributeName: 'Lights-Out',
        attributeDBName: 'HS_LightsOut',
    },
    {
        attributeName: 'Tetris',
        attributeDBName: 'HS_Tetris',
    },
    {
        attributeName: 'Wordle',
        attributeDBName: 'HS_Wordle',
    },
    {
        attributeName: 'Snake',
        attributeDBName: 'HS_Snake',
    },
    {
        attributeName: 'Checkers',
        attributeDBName: 'HS_Checkers',
    },
    {
        attributeName: 'Connect4',
        attributeDBName: 'HS_Connect4',
    },
    {
        attributeName: 'Pong',
        attributeDBName: 'HS_Pong',
    },
    {
        attributeName: 'Meteor Killers',
        attributeDBName: 'HS_SpaceGame',
    },
    {
        attributeName: 'Typing Master',
        attributeDBName: 'HS_Typing',
    },
    {
        attributeName: '2048',
        attributeDBName: 'HS_2048',
    },
];


const UsernameHeader = (props) => {
    return (
        <Container sx={{borderBottom: 1, height: 75, mt: 3, marginLeft: 1}}>
            <Typography fontWeight='bold' fontSize='35px' sx={{fontFamily: 'Jura, Arial'}} color='#FAE6FA'>
                Welcome {window.currentUserLoggedIn}!   
            </Typography>
        </Container>
    );
}

function UserDataEntry (props) {
    //console.log(`userdata: ${JSON.stringify(props.account)}`);
    return (
        //props.account.map(account =>
            <Grid container sx={{
                width: 800,
                height: 100,
                backgroundColor: '#b3e5fc',
                '&:hover': {
                    backgroundColor: '#b3e5fc',
                    opacity: [0.9, 0.8, 0.7],
                },
                border: 2,
                borderColor: '#4fc3f7',
                mb: 1
            }}>
                <Box display='flex' flexDirection='row' justifyContent='left' sx={{height: '100%', width: '32%', borderRight: 1.5, borderColor: '#4fc3f7'}}>
                    <Card key={"profilePic"} sx={{width: '40%', height: '80%', borderRadius: '50%',  border: 1, mt: 1, marginLeft: 1}}>
                        <CardMedia style={{width: '100%', height: '100%', justifySelf: 'center'}} image={require(`../UserProfile/UsersPictures/${props.account['user_ProfilePic']}`)} title={"profilePic"}/>
                    </Card>
                    <Box key="userName" sx={{height:'30%', width:'80%', marginLeft: 1}}>
                        <Typography fontSize='auto' fontWeight='bold' sx={{fontFamily: "Jura, Arial", mt: 4}}>
                            {props.account !== undefined ? "@"+props.account['username_user_post'] : 'none'}
                        </Typography>
                    </Box>
                </Box>
                <Box display='flex' flexDirection='row' justifyContent='left' sx={{width: 400, marginLeft: 2}}>
                    <Typography display='inline' fontSize='auto' fontWeight='bold' sx={{fontFamily: "Jura, Arial", mt: 4, textAlign: 'left'}}>
                        {props.account !== undefined ? props.account['post_content'] : 'none'}
                    </Typography>
                </Box>
                <Box display='flex' flexDirection='row' justifyContent='center' alignContent='center' sx={{height: '100%', width: '10%', borderLeft: 1.5, borderColor: '#4fc3f7', paddingLeft: 7}}>
                    <Typography fontSize='12px' fontWeight='bold' sx={{fontFamily: "Jura, Arial", mt: 4, textAlign: 'center'}}>
                        {props.account !== undefined ? props.account['DATE_FORMAT(date_created, \'%m/%d/%Y\')'] : ''} {props.account['cast(date_created as time)']}
                    </Typography>
                </Box>
            </Grid>
        //)
    );
}

function ActivityFeed (props) {
    //props.posts.sort((d1, d2) => d1['date_created'] - d2['date_created']);
    console.log(`posts in activity feed: ${JSON.stringify(props.posts)}`);
    return (
        <Box sx={{width: '100%', height: 1300, mt: -7, overflowY: 'scroll'}}>
            <Typography fontWeight='bold' fontSize='25px' sx={{textAlign: 'center', fontFamily: "Jura, Arial", mb: 2}} color='#FAE6FA'>
                FOLLOWED USERS ACTIVITY
            </Typography>
            <Box sx={{
                minWidth: '100%',
                height: '95%',
                border: 1,
                padding: 1,
                backgroundColor: '#946aa6'
            }}>
                {props.posts !== undefined ?
                    props.posts.map(post =>
                        <UserDataEntry account={post}/>
                    ) : <UserDataEntry account={testUser}/>
                }
            </Box>
        </Box>
    )
}



const Dashboard = (props) => {
    const classes = useStyles();
    const [followedUsers, setFollowedUsers] = useState([]);
    const [curUserHighScores, setCurUserHighScores] = useState([]);
    const [followedUsersPosts, setFollowedUsersPosts] = useState([]);

    useEffect(() => {
        console.log("in useEffect for followed users");

        const api = new API;
        async function getFollowedUsers() {
            const followedUsersJSONString = await api.followedUser(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(followedUsersJSONString)}`);
            setFollowedUsers(followedUsersJSONString.data);
        }
        getFollowedUsers();
    }, []);

    useEffect(() => {
        console.log("in useEffect for current user high scores");

        const api = new API;
        async function getCurrentUserHighScores() {
            const currentUserHighScoresJSONString = await api.userHighScores(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(currentUserHighScoresJSONString)}`);
            setCurUserHighScores(currentUserHighScoresJSONString.data);
        }
        getCurrentUserHighScores();
    }, []);

    useEffect(() => {
        console.log("in useEffect for followed user posts");
        if (followedUsers.length === 0)
            return;
        const api = new API;
        async function getFollowedUserPosts() {
            let tempPosts = [];
            for (let i = 0; i < followedUsers.length; i++) {
                // console.log(`followedUsers length: ${followedUsers.length}`);
                // console.log(`username set to query: ${followedUsers[i]['username_follower']}`);
                const followedUserPostsJSONString = await api.usersFollowedPosts(window.currentUserLoggedIn, followedUsers[i]['username_follower']);
                console.log(`routes from the DB ${JSON.stringify(followedUserPostsJSONString)}`);
                if (followedUserPostsJSONString.data.length === 0)
                    continue;
                tempPosts.push(followedUserPostsJSONString.data);
                // console.log(`tempPosts[i]: ${tempPosts[i]}`);
            }
            let newTemp = [].concat(...tempPosts);
            for (let elem of newTemp){
                elem['date_created'] = new Date(elem['date_created']);
            }
            newTemp.sort((d1, d2) => d1['date_created'] - d2['date_created']);
            console.log(`date type: ${typeof newTemp[0]['date_created']}`)
            console.log(`newTemp: ${JSON.stringify(newTemp)}`);
            //setFollowedUsersPosts(tempPosts);
            setFollowedUsersPosts(newTemp)
        }
        getFollowedUserPosts();
    }, [followedUsers]);

    function UserHighScores (props) {
        console.log(JSON.stringify(curUserHighScores));
        return (
            <Box sx={{height: 400, width: 350, mb: 4, border: 1, backgroundColor: '#946aa6', overflowY: 'scroll', marginLeft: 6}}>
                <Box display='flex' flexDirection='row' justifyContent='center' sx={{borderBottom: 1}}>
                    <Typography fontWeight='bold' fontSize='25px' sx={{mt: 0.5, mb: 0.5, textAlign: 'center', fontFamily: "Jura, Arial"}} color='#FAE6FA'>
                        YOUR HIGH SCORES:
                    </Typography>
                </Box>
                <Stack divider={<Divider orientation="horizontal" flexItem /> } style={{maxHeight: '100%', overflow: 'auto'}}>
                    {
                        curUserHighScores.length > 0 &&
                        highScoresTableAttributes.map(attr =>
                            <Box display='flex' flexDirection='row' justifyContent='center' sx={{marginBlock: 3, mt: 3}}>
                                <Typography fontSize='20px' sx={{textAlign: 'center', fontFamily: "Jura, Arial"}} color='#E6E6FA'>
                                    { curUserHighScores[0][attr.attributeDBName] !== undefined ? attr.attributeName+": "+ curUserHighScores[0][attr.attributeDBName] : '0'}
                                </Typography>
                            </Box>
                        )
                    }
                </Stack>
            </Box>
        )
    }

    function FollowedUsers (props) {
        return (
            <Box sx={{height: 400, width: 350, mb: 4, border: 1, backgroundColor: '#946aa6', overflowY: 'scroll', marginLeft: 6}}>
                <Box display='flex' flexDirection='row' justifyContent='center' sx={{borderBottom: 1}}>
                    <Typography fontWeight='bold' fontSize='25px' sx={{mt: 0.5, mb: 0.5, textAlign: 'center', fontFamily: "Jura, Arial"}} color='#FAE6FA'>
                        FOLLOWING:
                    </Typography>
                </Box>
                <Stack divider={<Divider orientation="horizontal" flexItem />} style={{maxHeight: '100%', overflow: 'auto'}}>
                    { followedUsers.length === 0 ? <Box display='flex' flexDirection='row' justifyContent='center' sx={{marginBlock: 3, mt: 3}}>
                            <Typography fontSize='20px' sx={{textAlign: 'center', fontFamily: "Jura, Arial"}}
                                        color='#f8f0e3'>
                                YOU ARE NOT FOLLOWING ANY USERS
                            </Typography>
                        </Box> :
                            followedUsers.map(user =>
                                <Button onClick={(event) => {event.preventDefault(); props.clickFunc(user['username_follower'])}} sx={{'&:hover': {
                                        backgroundColor: '#66468f',
                                        opacity: [0.1, 0.1, 0.9],
                                        borderColor: '#b186eb'
                                    },}}>
                                    <Box display='flex' flexDirection='row' justifyContent='center'
                                         sx={{marginBlock: 3, mt: 3}}>
                                        <Typography fontSize='20px' sx={{textAlign: 'center', fontFamily: "Jura, Arial"}}
                                                    color='#E6E6FA'>
                                            {user['username_follower']}
                                        </Typography>
                                    </Box>
                                </Button>
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
                    <FollowedUsers highScores={testHighScores} clickFunc={props.clickFunc}/>
                </Box>
                <Box>
                    <UserHighScores highScores={testHighScores}/>
                </Box>
            </Stack>
        )
    }

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
                        <HighScoreSideBar clickFunc={props.clickCallback}/>
                    </Grid>
                    <Grid item className={classes.item}>
                        <ActivityFeed posts={followedUsersPosts}/>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Dashboard;