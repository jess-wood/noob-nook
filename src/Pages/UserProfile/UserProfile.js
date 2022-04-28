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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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

const UserHighScores = (props) => {
    const {userData} = props;
    return (
        <Grid container sx={{width: '100%', height: '100%', backgroundColor: '#714C7A', borderRight:0, borderLeft: 2, borderTop:2}}>
            <Grid item key={'highscores'} sx={{ width: '100%', height: '100%', justifyContent: 'center'}}>
                <Typography fontWeight='bold' fontSize='30px' sx={{textDecoration: 'underline', border: 0, color:'#FAE6FA', mt: 0.5, mb: 0.5, marginRight: '5%', textAlign: 'center', fontFamily: "Jura, Arial"}}>High Scores</Typography>
                <Grid container item direction='row' sx={{width: '100%', height: '85%'}}>

                    {
                        highScoresTableAttributes.map(attr =>
                            <Grid item key={attr.attributeName} sx={{ mt: 0.5, mb: 0, width: '50%', height: '15%', border: 0, justifyContent: 'center'}}>
                                <Typography fontWeight='bold' sx={{textAlign: 'left',marginLeft: '10%', mt: 0, mb: 0, fontFamily: "Jura, Arial", color:'#E6E6FA', fontSize: '20px'}}>{attr.attributeName}: {userData.length > 0 ? userData[0][attr.attributeDBName]: '0'}{attr.attributeDBName === "HS_Typing" ? " WPM":""}</Typography>
                            </Grid>
                        )
                    }

                </Grid>
            </Grid>
        </Grid>
    )
}



const UserProfile = (props) => {
    const classes = useStyles();
    const {user, mainUser, isUserLoggedIn} = props;
    const [userData, setUserData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userFollowings, setUserFollowings] = useState([]);
    const [isFollowing, setIsFollowing] = useState(checkFollowStatus());
    const [userPic, setUserPic] = useState('default.jpg');
    let pic = 'default.jpg';
    console.log(userPic);
    // if (userData.length > 0){
    //     if (userData[0]['user_ProfilePic'] !== 'default.jpg' && userPic === 'default.jpg' ){
    //         setUserPic(userData[0]['user_ProfilePic']);
    //     }
    // }


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
        async function createUserHS() {
            console.log(`main user in UserProfile.js: ${mainUser}`);
            const userHSJSONString = await api.createHSRow(mainUser);
            console.log(`routes from the DB ${JSON.stringify(userHSJSONString)}`);
        }
        async function deleteIsPlayingStatus(){
            const userDeleteWordleJSONString = await api.deleteUserPost(mainUser, "is playing Wordle!");
            const userDeleteLOJSONString = await api.deleteUserPost(mainUser, "is playing Lights Out!");
            //const userDelete2048JSONString = await api.deleteUserPost(mainUser, "is playing 2048!");
            //console.log(`routes from the DB ${JSON.stringify(userDelete2048JSONString)}`);
            //const userDeletePongJSONString = await api.deleteUserPost(mainUser, "is playing Pong!");
            //console.log(`routes from the DB ${JSON.stringify(userDeletePongJSONString)}`);
            const userDeleteSnakeJSONString = await api.deleteUserPost(mainUser, "is playing Snake!");
            const userDeleteSpaceJSONString = await api.deleteUserPost(mainUser, "is playing Meteor Killers!");
            const userDeleteTetrisJSONString = await api.deleteUserPost(mainUser, "is playing Tetris!");
            const userDeleteTMJSONString = await api.deleteUserPost(mainUser, "is playing Typing Master!");
        }
        deleteIsPlayingStatus();
        createUserHS();
        getUserFollowing();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getUserData() {
            const userJSONString = await api.userInfo(user);
            console.log(`routes from the DB ${JSON.stringify(userJSONString)}`);
            setUserData(userJSONString.data);
            if (userData[0]['user_ProfilePic'] !== undefined) {
                console.log('setting profile pic');
                setUserPic(userData[0]['user_ProfilePic']);
            }
        }

        async function getUserPosts(){
            const userPostJSONString = await api.userPost(user);
            setPosts(userPostJSONString.data);
        }

        async function getUserFollowing() {
            const userFollowJSONString = await api.allUserFollowings(mainUser);
            setUserFollowings(userFollowJSONString.data);

        }

        getUserFollowing();
        getUserData();
        if (userData.length > 0){
            console.log(userData[0]['user_ProfilePic']);
            setUserPic(userData[0]['user_ProfilePic']);
        }
        getUserPosts();
    }, [user]);

    useEffect(() => {
        const api = new API();
        async function getUserFollowing() {
            const userFollowJSONString = await api.allUserFollowings(mainUser);
            //console.log(`routes from the DB ${JSON.stringify(userFollowJSONString.data)}`);
            setUserFollowings(userFollowJSONString.data);

        }

        getUserFollowing();
    }, [isFollowing]);

    function checkFollowStatus(){
        if(userFollowings.length === 0){
            return false;
        }
        for (let i=0; i < userFollowings.length; i ++){
            if (userFollowings[i].username_follower === user){
                return true;
            }
        }
        return false;
    }

    const handleFollow = () => {
        const api = new API();

        async function followUser() {
            const userJSONString = await api.followUser(mainUser, user);
            console.log(`routes from the DB ${JSON.stringify(userJSONString)}`);
            setIsFollowing(true);
        }
        followUser();
    }

    const handleUnfollow = () => {
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
            }} sx={{border: 2}}>
                <Grid container style={{border: 2}} sx={{border: 5, display: 'flex', flexDirection: 'row', width:'100%', height: '50%'}}>
                    <Grid item key={"ProfilePic"} sx={{border: 0, width: '50%', mt: 0, mb: 3}}>
                        <Card key={"profilePic"} sx={{border: 4, borderRadius: '50%', height: '70%', marginLeft: 4, width: '80%', mt: 5}}>
                            <CardMedia style={{width: '101%', height: '100%', justifySelf: 'center', marginLeft: 0}} image={require(`./UsersPictures/${userData.length === 0 ? userPic : userData[0]['user_ProfilePic']}`)} title={"profilePic"}/>
                        </Card>
                        {isUserLoggedIn ? <br/> :
                            checkFollowStatus() || isFollowing ? <Button key={'unfollow'} sx={{marginLeft: '35%', height:'10%', mt: 3, mb: 3, backgroundColor: '#4fc3f7', color: '#000',borderColor: '#4fc3f7','&:hover': {backgroundColor: '#4fc3f7',opacity: [0.6, 0.6, 0.6],}}} onClick={() => handleUnfollow()}> <Typography sx={{fontFamily: "Jura, Arial", fontWeight:'bold',bottom: '9px'}}>Unfollow <RemoveCircleOutlineIcon style={{ color: '#000', marginLeft:1,verticalAlign:'middle'}}/></Typography> </Button> :
                                <Button key={'follow'} sx={{marginLeft: '35%', mt: 3, mb: 3, backgroundColor: alpha('#5CAD31', 0.9), color: '#000', fontWeight: 'bold','&:hover': {backgroundColor: alpha('#5CAD31', 0.9)}}} onClick={() => handleFollow()}> <Typography sx={{fontFamily: "Jura, Arial", fontWeight:'bold'}}>Follow  </Typography>  <AddCircleOutlineOutlined style={{ color: '#000', marginLeft:1 }}/></Button>
                        }
                    </Grid>
                    <Grid item key={"UserInfo"} sx={{border: 0, width: '50%', alignItems: 'center', height: '50%'}}>
                        <Box key='user_full_name' sx={{border: 0, mt: 10, width: 'fit-content', marginLeft: 3, color:'#FAE6FA'}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '40px'}}>{userData.length > 0 ? userData[0]['user_fName'] !== null ? userData[0]['user_fName'] : 'First' : "First"} {userData.length > 0 ? userData[0]['user_lName'] !== null ? userData[0]['user_lName'] : 'Last' : 'Last'}</Typography>
                        </Box>
                        <Box key='usernameProfile' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#E6E6FA'}}>@{userData.length > 0 ? userData[0]['username'] : 'none'}</Typography>
                        </Box>
                        <Box key='dateJoinedProfile' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#E6E6FA'}}>A noob since {userData.length > 0 ? userData[0]['DATE_FORMAT(dateJoined, \'%m/%d/%Y\')'] : '03/19/22'}</Typography>
                        </Box>
                        <Box key='rankProfile' sx={{border: 0, mt: 1, width: 'fit-content', marginLeft: 3}}>
                            <Typography sx={{fontFamily: "Jura, Arial", fontWeight: 'bold', fontSize: '20px', color:'#E6E6FA'}}>Rank: {userData.length > 0 ? userData[0]['user_rank'] : 'none'}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item key={'UserHighScoresProfile'} sx={{width: '100%', border: 0, height: '40%', backgroundColor: '#714C7A'}}>
                    <UserHighScores userData={userData}/>
                </Grid>
            </Grid>
            <Grid item key={'ActivityFeed'} style={{
                width: "55%",
                height: "100vh",
                marginLeft: '45%',
                backgroundColor: '#714C7A',
                padding: 1
            }} sx={{border: 1, display:'flex',flexDirection:'column' }}>
                <Box sx={{width: '54.5%', height: '7%', alignItems: 'center', fontSize: 30, backgroundColor: '#714C7A', position:'fixed', margin:'auto'}}>
                    <Typography sx={{textDecoration: 'underline', fontWeight: 'bold', fontSize: '30px', textAlign: 'center', fontFamily: "Jura, Arial", color:'#FAE6FA'}}>
                        Activity Feed
                    </Typography>
                </Box>
                <Box sx={{height:'9%'}}></Box>
                {
                    posts.map(post =>
                        <Grid container item direction='column' sx={{
                            width: '95%',
                            height: '10%',
                            backgroundColor: '#b3e5fc',
                            '&:hover': {
                                backgroundColor: '#b3e5fc',
                                opacity: [0.9, 0.8, 0.7],
                            },
                            border: 2,
                            borderColor: '#4fc3f7',
                            marginLeft:0,
                            alignItems: 'center',
                            alignSelf: 'center',
                            mt: 0,
                            mb:1,
                        }}>
                            <Box display='flex' flexDirection='row' justifyContent='center' sx={{height: '100%', width: '30%', borderRight: 1.5, borderColor: '#4fc3f7', marginLeft:1, mb: 1}}>
                                <Card key={"profilePicInProfile"} sx={{width: '35%', height: '90%', borderRadius: '50%',  border: 1, mt: 1, marginLeft: 1, borderColor: '#4fc3f7'}}>
                                    <CardMedia style={{width: '100%', height: '100%', justifySelf: 'center'}} image={require(`../UserProfile/UsersPictures/${userData[0]['user_ProfilePic']}`)} title={"profilePic"}/>
                                </Card>
                                <Box key="userName" sx={{height:'30%', width:'80%', marginLeft: 1}}>
                                    <Typography fontSize='16px' sx={{fontFamily: "Jura, Arial", mt: 3, marginLeft: 1, fontWeight:'bold'}}>
                                        @{userData.length > 0 ? userData[0]['username'] : 'none'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display='flex' flexDirection='row' justifyContent='center' sx={{width: '65%', marginLeft: 0, mt:2.5, marginRight:20}}>
                                <Typography fontSize='16px' sx={{fontFamily: "Jura, Arial", mb: 1, fontWeight:'bold'}}>
                                     {post.post_content}
                                </Typography>
                            </Box>
                            <Box display='flex' flexDirection='row' justifyContent='center' sx={{width: '50%', height: '10%', marginLeft: 34}}>
                                <Typography fontSize='10px' sx={{fontFamily: "Jura, Arial", mb: 2, fontWeight:'bold'}}>
                                    {post['DATE_FORMAT(date_created, \'%m/%d/%Y\')'] ? post['DATE_FORMAT(date_created, \'%m/%d/%Y\')'] : ""} {post['cast(date_created as time)']}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default UserProfile;

//bold the name, make username apparent
//Profile pic must be from a file, must figure out how to fix that
//fix snake back, edit profile, fix 2048 centering


//USERPROFILE ACTIVITY FEED
// <Grid item key={'ActivityFeed'} style={{
//     width: "55%",
//     height: "100vh",
//     marginLeft: '45%',
//     backgroundColor: '#714C7A'
// }} sx={{border: 1, display:'flex',flexDirection:'column', backgroundColor: '#714C7A' }}>
//     <Box sx={{width: '100%', height: '8%', alignItems: 'center', fontSize: 30}}>
//         <Typography sx={{textDecoration: 'underline', fontWeight: 'bold', fontSize: '30px', textAlign: 'center', fontFamily: "Jura, Arial", color:'#E7DECC'}}>
//             Activity Feed
//         </Typography>
//     </Box>
//     {
//         posts.map(post =>
//             <Box key={post.post_content} sx={{width: '100%', height: '10%', border: 1, justifySelf: 'center', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#714C7A'}}>
//                 <Typography sx={{mt: '3%', marginLeft: '2%',fontFamily: "Jura, Arial", fontWeight: '400', fontSize: '20px', color:'#F8F0E3'}}>@{post.username} {post.post_content}</Typography>
//             </Box>
//         )
//     }
// </Grid>