import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from './UsersPictures/slick_doe.jpg';
import '../Login/Login.css';
import {Card, CardMedia, Grid} from "@mui/material";
import {AddCircleOutlineOutlined} from '@mui/icons-material';
import {useState, useEffect} from "react";
import API from '../../API_Interface/API_Interface';

export const testHighScores = [
    {
        game: "Wordle",
        score: "10m5s"
    },
    {
        game: "Lights-Out",
        score: "1h20m"
    },
    {
        game: "Checkers",
        score: "1000"
    },
    {
        game: "Connect4",
        score: "5000"
    },
    {
        game: "Tetris",
        score: "6000"
    },
    {
        game: "2048",
        score: "55000"
    },
    {
        game: "Pong",
        score: "3000"
    },
    {
        game: "Space Invaders",
        score: "83740"
    },
    {
        game: "Memory Scramble",
        score: "7487"
    },
    {
        game: "snake",
        score: '6857'
    }
];

const FollowButton = () => {

    return <Button key={'follow'} sx={{marginLeft: 0, mt: 3, mb: 3, backgroundColor: 'darkgray'}}> Follow <AddCircleOutlineOutlined/></Button>

}

const EditProfileButton = (props) => {

}

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

const UserProfile = (props) => {
    console.log("in profile");
    const {user, isUserLoggedIn} = props;
    console.log(user);
    const [userData, setUserData] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('in useEffect');
        const api = new API();

        async function getUserData() {
            console.log("in getUserData");
            const userJSONString = await api.userInfo(user);
            console.log(`routes from the DB ${JSON.stringify(userJSONString)}`);
            setUserData(userJSONString.data);
            console.log(`first ${JSON.stringify(userData[0]['HS_Wordle'])}`);
        }

        async function getUserPosts(){
            console.log("in getUserPosts");
            const userPostJSONString = await api.userPost(user);
            console.log(`routes from the DB ${JSON.stringify(userPostJSONString)}`);
            setPosts(userPostJSONString.data);
            console.log(JSON.stringify(posts));
        }

        getUserData();
        getUserPosts();
    }, [user]);

    return (
        <Grid container position='fixed' style={{
            minWidth: "100%",
            height: "100%",
            backgroundColor: '#714C7A'
        }} direction='row'  columns={2} sx={{display:'flex', border: 1,}}>
            <Grid item key={'left'} style={{
                width: "50%",
                height: "100%",
            }} sx={{}}>
                <Grid container style={{border: 2}} sx={{border: 5, display: 'flex', flexDirection: 'row', width:'100%', height: '50%'}}>
                    <Grid item key={"ProfilePic"} sx={{border: 0, width: '50%'}}>
                        <Card key={"profilePic"} sx={{border: 4, borderRadius: '50%', height: '60%', marginLeft: 4, width: '75%', mt: 5}}>
                            <CardMedia style={{width: 250, height: 250, justifySelf: 'center'}} image={require(`./UsersPictures/${user}.jpg`)} title={"profilePic"}/>
                        </Card>
                        {isUserLoggedIn ? <br/> : <FollowButton/>}
                    </Grid>
                    <Grid item key={"UserInfo"} sx={{border: 0, width: '50%', alignItems: 'center', height: '50%'}}>
                        <Box key='user full name' sx={{border: 0, mt: 10, width: 'fit-content', marginLeft: 3, color:'#E7DECC'}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '40px'}}>{userData.length > 0 ? userData[0]['user_fName'] : "none"} {userData.length > 0  ? userData[0]['user_lName'] : 'none'}</Typography>
                        </Box>
                        <Box key='username' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#F8F0E3'}}>@{userData.length > 0 ? userData[0]['username'] : 'none'}</Typography>
                        </Box>
                        <Box key='dateJoined' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#F8F0E3'}}>A noob since {userData.length > 0 ? userData[0]['DATE_FORMAT(dateJoined, \'%m/%d/%Y\')'] : '03/19/22'}</Typography>
                        </Box>
                        <Box key='rank' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#F8F0E3'}}>Rank: {userData.length > 0 ? userData[0]['user_rank'] : 'none'}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{width: '100%', border: 1, height: '40%'}}>
                    <Grid item key={'highscores'} sx={{ width: '100%', height: '100%', justifyContent: 'center'}}>
                        <Typography fontWeight='bold' fontSize='30px' sx={{textDecoration: 'underline', border: 0, color:'#E7DECC', mt: 0.5, mb: 0.5, marginRight: '5%', textAlign: 'center', fontFamily: "Jura, Arial"}}>High Scores</Typography>
                        <Grid container item direction='row' sx={{width: '100%', height: '85%'}}>

                        {
                            highScoresTableAttributes.map(attr =>
                                <Grid item key={attr.attributeName} sx={{ mt: 0.5, mb: 0, width: '50%', height: '15%', border: 0, justifyContent: 'center'}}>
                                    <Typography fontWeight='bold' sx={{textAlign: 'left',marginLeft: '10%', mt: 0, mb: 0, fontFamily: "Jura, Arial", color:'#F8F0E3', fontSize: '20px'}}>{attr.attributeName}: {userData.length > 0 ? userData[0][attr.attributeDBName]: '0'}</Typography>
                                </Grid>
                            )
                        }

                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item key={'ActivityFeed'} style={{
                minWidth: "50%",
                height: "100%",
            }} sx={{border: 1, display:'flex',flexDirection:'column' }}>
                <Box sx={{width: '100%', height: '8%', alignItems: 'center', fontSize: 30}}>
                    <Typography sx={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center', fontFamily: "Jura, Arial", color:'#E7DECC'}}>
                        Activity Feed
                    </Typography>
                </Box>
                {
                    posts.map(post =>
                        <Box key={post} sx={{width: '100%', height: '8%', border: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Typography sx={{mt: '2%', fontFamily: "Jura, Arial", fontWeight: '400', fontSize: '20px', color:'#F8F0E3'}}>@{post.username} {post.post_content}</Typography>
                        </Box>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default UserProfile;

//bold the name, make username apparent
//Profile pic must be from a file, must figure out how to fix that
//need to toggle follow button to not show on their profile, need to toggle follow/unfollow
//{userData[0]['user_fName'] } {userData[0]['user_lName']}
//userData[0]['username']