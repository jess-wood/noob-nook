import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Login/Login.css';
import {Card, CardMedia, Grid} from "@mui/material";
import {AddCircleOutlineOutlined} from '@mui/icons-material';
import {useState, useEffect} from "react";
import API from '../../API_Interface/API_Interface';
import {makeStyles} from "@material-ui/core/styles";
import {alpha} from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles({
    button: {
        '&:hover': {
            backgroundColor: '#5CAD31',
        },
    }})

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

const FollowButton = (props) => {
    const classes = useStyles();
    const {mainUser, userToFollow, followStatus, follow, unfollow} = props;
    console.log(`in followButton ${followStatus}`);



    if (followStatus){
        return <Button key={'follow'} sx={{marginLeft: '33%', mt: 4, mb: 3, backgroundColor: '#FCB360', color: '#D6CBBF'}} onClick={() => props.unfollow}> Following </Button>
    }
    else {
        return <Button className={classes.button} key={'follow'} sx={{marginLeft: '33%', mt: 4, mb: 3, backgroundColor: alpha('#5CAD31', 0.9), color: '#D4C3DB'}} onClick={() => props.follow}> Follow  <AddCircleOutlineOutlined style={{ color: '#D4C3DB' }}/></Button>
    }
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
    const classes = useStyles();
    const {user, mainUser, isUserLoggedIn} = props;
    const [userData, setUserData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userFollowings, setUserFollowings] = useState([]);
    const [isFollowing, setIsFollowing] = useState(checkFollowStatus());
    const [userPic, setUserPic] = useState(user);



    useEffect(() => {
        console.log('in useEffect for user following');
        const api = new API();

        async function getUserFollowing() {
            const userFollowJSONString = await api.allUserFollowings(mainUser);
            console.log(`routes from the DB ${JSON.stringify(userFollowJSONString)}`);
            setUserFollowings(userFollowJSONString.data);
            if (userFollowings.length > 0)
                setIsFollowing(checkFollowStatus());
        }
        getUserFollowing();
    }, []);

    useEffect(() => {
        console.log('in useEffect');
        const api = new API();

        async function getUserData() {
            const userJSONString = await api.userInfo(user);
            console.log(`routes from the DB ${JSON.stringify(userJSONString)}`);
            setUserData(userJSONString.data);
        }

        async function getUserPosts(){
            const userPostJSONString = await api.userPost(user);
            console.log(`routes from the DB ${JSON.stringify(userPostJSONString)}`);
            setPosts(userPostJSONString.data);
        }

        async function getUserFollowing() {
            const userFollowJSONString = await api.allUserFollowings(mainUser);
            console.log(`routes from the DB ${JSON.stringify(userFollowJSONString)}`);
            setUserFollowings(userFollowJSONString.data);

        }

        getUserFollowing();
        getUserData();
        getUserPosts();
    }, [user]);

    function checkFollowStatus(){
        if(userFollowings.length === 0){
            return false;
        }
        for (let i=0; i < userFollowings.length; i ++){
            if (userFollowings[i].username_follower === user){
                console.log(`in checkStatus about to return true`);
                return true;
            }
        }
        return false;
    }

    const handleFollow = () => {
        console.log("in handleFollow");
        const api = new API();

        async function followUser() {
            const userJSONString = await api.followUser(mainUser, user);
            console.log(`routes from the DB ${JSON.stringify(userJSONString)}`);
            setIsFollowing(true);
        }
        followUser();
    }

    const handleUnfollow = () => {
        console.log("in handleUnFollow");
        const api = new API();

        async function unfollowUser() {
            const userJSONString = await api.unfollowUser(mainUser, user);
            console.log(`routes from the DB ${JSON.stringify(userJSONString)}`);
            setIsFollowing(false);
        }
        unfollowUser();
    }

    return (
        <Grid container style={{
            minWidth: "100%",
            height: "100%",
            backgroundColor: '#714C7A'
        }} direction='row'  columns={2} sx={{display:'flex', border: 1,}}>
            <Grid item key={'left'} position='fixed' style={{
                width: "45%",
                height: "100%",
                backgroundColor: '#714C7A',
            }} sx={{border: 1}}>
                <Grid container style={{border: 2}} sx={{border: 5, display: 'flex', flexDirection: 'row', width:'100%', height: '50%'}}>
                    <Grid item key={"ProfilePic"} sx={{border: 0, width: '50%'}}>
                        <Card key={"profilePic"} sx={{border: 4, borderRadius: '50%', height: '60%', marginLeft: 4, width: '75%', mt: 5}}>
                            <CardMedia style={{width: 250, height: 250, justifySelf: 'center'}} image={require(`./UsersPictures/default.jpg`)} title={"profilePic"}/>
                        </Card>
                        {isUserLoggedIn ? <br/> :
                            checkFollowStatus() ? <Button key={'follow'} sx={{marginLeft: '33%', mt: 4, mb: 3, backgroundColor: '#FCB360', color: '#33302C'}} onClick={() => handleUnfollow()}> Following </Button> :
                                <Button key={'follow'} sx={{marginLeft: '33%', mt: 4, mb: 3, backgroundColor: alpha('#5CAD31', 0.9), color: '#D4C3DB'}} onClick={() => handleFollow()}> Follow  <AddCircleOutlineOutlined style={{ color: '#D4C3DB' }}/></Button>
                        }
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
                <Grid container sx={{width: '100%', border: 1, height: '40%', backgroundColor: '#714C7A'}}>
                    <Grid item key={'highscores'} sx={{ width: '100%', height: '100%', justifyContent: 'center'}}>
                        <Typography fontWeight='bold' fontSize='30px' sx={{textDecoration: 'underline', border: 0, color:'#E7DECC', mt: 0.5, mb: 0.5, marginRight: '5%', textAlign: 'center', fontFamily: "Jura, Arial"}}>High Scores</Typography>
                        <Grid container item direction='row' sx={{width: '100%', height: '85%'}}>

                        {
                            highScoresTableAttributes.map(attr =>
                                <Grid item key={attr.attributeName} sx={{ mt: 0.5, mb: 0, width: '50%', height: '15%', border: 0, justifyContent: 'center'}}>
                                    <Typography fontWeight='bold' sx={{textAlign: 'left',marginLeft: '10%', mt: 0, mb: 0, fontFamily: "Jura, Arial", color:'#F8F0E3', fontSize: '20px'}}>{attr.attributeName}: {userData.length > 0 ? userData[0][attr.attributeDBName]: '0'}{attr.attributeDBName === "HS_Typing" ? " WPM":""}</Typography>
                                </Grid>
                            )
                        }

                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item key={'ActivityFeed'} style={{
                width: "55%",
                height: "100vh",
                marginLeft: '45%',
                backgroundColor: '#714C7A'
            }} sx={{border: 1, display:'flex',flexDirection:'column', backgroundColor: '#714C7A' }}>
                <Box sx={{width: '100%', height: '8%', alignItems: 'center', fontSize: 30}}>
                    <Typography sx={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center', fontFamily: "Jura, Arial", color:'#E7DECC'}}>
                        Activity Feed
                    </Typography>
                </Box>
                {
                    posts.map(post =>
                        <Box key={post.post_content} sx={{width: '100%', height: '10%', border: 1, justifySelf: 'center', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#714C7A'}}>
                            <Typography sx={{mt: '3%', marginLeft: '2%',fontFamily: "Jura, Arial", fontWeight: '400', fontSize: '20px', color:'#F8F0E3'}}>@{post.username} {post.post_content}</Typography>
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