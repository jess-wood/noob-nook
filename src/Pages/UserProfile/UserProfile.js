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
    const {user, mainUser, isUserLoggedIn} = props;
    const [userData, setUserData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userFollowings, setUserFollowings] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [userPic, setUserPic] = useState('default.jpg');
    const [rankChanged, setRankChanged] = useState(false);


    useEffect(() => {
        const api = new API();

        async function createUserHS() {
            console.log(`main user in UserProfile.js: ${mainUser}`);
            const userHSJSONString = await api.createHSRow(mainUser);
            console.log(`routes from the DB ${JSON.stringify(userHSJSONString)}`);
        }
        async function deleteIsPlayingStatus(){
            const userDeleteWordleJSONString = await api.deleteUserPost(mainUser, "is playing Wordle!");
            const userDeleteLOJSONString = await api.deleteUserPost(mainUser, "is playing Lights Out!");
            const userDelete2048JSONString = await api.deleteUserPost(mainUser, "is playing 2048!");
            const userDeletePongJSONString = await api.deleteUserPost(mainUser, "is playing Pong!");
            const userDeleteSnakeJSONString = await api.deleteUserPost(mainUser, "is playing Snake!");
            const userDeleteSpaceJSONString = await api.deleteUserPost(mainUser, "is playing Meteor Killers!");
            const userDeleteTetrisJSONString = await api.deleteUserPost(mainUser, "is playing Tetris!");
            const userDeleteTMJSONString = await api.deleteUserPost(mainUser, "is playing Typing Master!");
            const userDeleteMSJSONString = await api.deleteUserPost(mainUser, "is playing Memory Scramble!");
            const userDeleteC4JSONString = await api.deleteUserPost(mainUser, "is playing Connect4!");
        }
        deleteIsPlayingStatus();
        //createUserHS();

    }, []);

    useEffect(() => {
        const api = new API();

        async function getUserData() {
            const userJSONString = await api.userInfo(user);
            setUserData(userJSONString.data);
            if (userData[0]['user_ProfilePic'] !== undefined) {
                setUserPic(userData[0]['user_ProfilePic']);
            }
            if (userData.length > 0){
                checkDateJoined(userData[0]['DATE_FORMAT(dateJoined, \'%m/%d/%Y\')'])
            }
        }

        async function getUserPosts(){
            const userPostJSONString = await api.userPost(user);
            setPosts(userPostJSONString.data);
        }

        async function getUserFollowing() {
            const userFollowJSONString = await api.allUserFollowings(mainUser);
            api.allUserFollowings(mainUser).then(userInfo => checkFollowStatus(userInfo.data));
            console.log(`routes from the DB ${JSON.stringify(userFollowJSONString.data)}`);
            setUserFollowings(userFollowJSONString.data);

        }

        getUserFollowing();
        getUserData();
        if (userData.length > 0){
            setUserPic(userData[0]['user_ProfilePic']);
        }
        if (userData.length > 0){
            checkDateJoined(userData[0]['DATE_FORMAT(dateJoined, \'%m/%d/%Y\')'])
        }
        getUserPosts();
    }, [user, rankChanged]);

    useEffect(() => {
        const api = new API();
        async function getUserFollowing() {
            const userFollowJSONString = await api.allUserFollowings(mainUser);
            setUserFollowings(userFollowJSONString.data);

        }

        getUserFollowing();
    }, [isFollowing]);

    const changeRank = (newRank) => {
        const api = new API();
        async function changeRankForUser() {
            const rankChangeJSONString = await api.changeUserRank(newRank, user);
            console.log(`routes from the DB ${JSON.stringify(rankChangeJSONString.data)}`);
        }

        changeRankForUser();
    }

    function checkDateJoined(userJoinedDate){
        //get current date
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let day = today.getDate();
        //get user date as int
        let userDateArray = userJoinedDate.split("/");
        let userMonth =parseInt(userDateArray[0]);
        let userDay =parseInt(userDateArray[1]);
        let userYear =parseInt(userDateArray[2]);
        //calculate difference
        let yearDiff = year - userYear;

        if (yearDiff > 0 && userData[0]['user_rank'] !== 'Ultra Noob'){
            if (userMonth <= month) {
                if (userMonth === month && userDay <= day) {
                    changeRank('Ultra Noob');
                    setRankChanged(true);
                }
                else if (userMonth > month){
                    changeRank('Ultra Noob');
                    setRankChanged(true);
                }
            }
            else if (userMonth > month){
                if (month - userMonth > -11 && userDay <= day){
                    if (userData[0]['user_rank'] !== 'Custy Noob'){
                        changeRank('Custy Noob');
                        setRankChanged(true);
                    }
                }
                else if (month - userMonth === -9 && userDay <= day){
                    if (userData[0]['user_rank'] !== 'Semi Noob'){
                        changeRank('Semi Noob');
                        setRankChanged(true);
                    }
                }
                else if (month - userMonth === -6 && userDay <= day){
                    if (userData[0]['user_rank'] !== 'Hyper Noob'){
                        changeRank('Hyper Noob');
                        setRankChanged(true);
                    }
                }
            }
        }
        else if (yearDiff === 0){
            if (month - userMonth > 0){
                if (month - userMonth < 3){ //custy
                    if (userDay <= day && userData[0]['user_rank'] !== 'Custy Noob'){
                        changeRank('Custy Noob');
                        setRankChanged(true);
                    }
                }
                else if (month - userMonth === 3 && userData[0]['user_rank'] !== 'Semi Noob'){
                    if (userDay <= day){
                        changeRank('Semi Noob');
                        setRankChanged(true);
                    }
                }
                else if (month - userMonth === 6 && userData[0]['user_rank'] !== 'Hyper Noob'){
                    if (userDay <= day){
                        changeRank('Hyper Noob');
                        setRankChanged(true);
                    }
                }
            }
            else{
                if (userData[0]['user_rank'] !== 'Nooblet'){
                    changeRank('N00blet');
                    setRankChanged(true);
                }
            }
        }
    }

    function checkFollowStatus(followList){
        if(followList.length === 0){
            setIsFollowing(false);
            return false;
        }
        for (let i=0; i < followList.length; i ++){
            if (followList[i].username_follower === user){
                setIsFollowing(true);
                return true;
            }
        }
        setIsFollowing(false);
        return false;
    }

    const handleFollow = () => {
        const api = new API();

        async function followUser() {
            const userJSONString = await api.followUser(mainUser, user);
            setIsFollowing(true);
        }
        followUser();
    }

    const handleUnfollow = () => {
        const api = new API();

        async function unfollowUser() {
            const userJSONString = await api.unfollowUser(mainUser, user);
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
                width: "44%",
                height: "100%",
                mt: -0.2,
                backgroundColor: '#714C7A',
            }} sx={{border: 2}}>
                <Grid container style={{border: 2}} sx={{border: 5, display: 'flex', flexDirection: 'row', width:'100%', height: '50%'}}>
                    <Grid item key={"ProfilePic"} sx={{border: 0, width: '50%', mt: 0, mb: 3}}>
                        <Card key={"profilePic"} sx={{border: 4, borderRadius: '50%', height: '70%', marginLeft: 4, width: '80%', mt: 5}}>
                            <CardMedia style={{width: '101%', height: '100%', justifySelf: 'center', marginLeft: 0}} image={userData.length > 0 ? userData[0]['user_ProfilePic'] : 'https://res.cloudinary.com/noobnook/image/upload/v1652216058/default_seqeny.webp'} title={"profilePic"}/>
                        </Card>
                        {isUserLoggedIn ? <br/> :
                            isFollowing ? <Button key={'unfollow'} sx={{marginLeft: '35%', height:'10%', mt: 3, mb: 3, backgroundColor: '#4fc3f7', color: '#000',borderColor: '#4fc3f7','&:hover': {backgroundColor: '#4fc3f7',opacity: [0.6, 0.6, 0.6],}}} onClick={() => handleUnfollow()}> <Typography sx={{fontFamily: "Jura, Arial", fontWeight:'bold',bottom: '9px'}}>Unfollow <RemoveCircleOutlineIcon style={{ color: '#000', marginLeft:1,verticalAlign:'middle'}}/></Typography> </Button> :
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
                width: "56%",
                height: "500vh",
                marginLeft: '44%',
                backgroundColor: '#714C7A',
                padding: 1
            }} sx={{border: 1, display:'flex',flexDirection:'column' }}>
                <Box sx={{width: '55.5%', height: '7%', alignItems: 'center', fontSize: 30, backgroundColor: '#714C7A', position:'fixed', margin:'auto', mt:-0.5}}>
                    <Typography sx={{textDecoration: 'underline', fontWeight: 'bold', fontSize: '30px', textAlign: 'center', fontFamily: "Jura, Arial", color:'#FAE6FA'}}>
                        Activity Feed
                    </Typography>
                </Box>
                <Box sx={{height:'1.8%', border:0, borderColor:'red'}}></Box>
                {
                    posts.map(post =>
                        <Grid container item direction='column' sx={{
                            width: '97%',
                            height: '10vh',
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
                                <Card key={"profilePicInProfile"} sx={{width: '30%', height: '90%', borderRadius: '50%',  border: 1, mt: 1, marginLeft: 1, borderColor: '#4fc3f7'}}>
                                    <CardMedia style={{width: '100%', height: '100%', justifySelf: 'center'}} image={userData.length > 0 ? userData[0]['user_ProfilePic'] : 'https://res.cloudinary.com/noobnook/image/upload/v1652216058/default_seqeny.webp'} title={"profilePic"}/>
                                </Card>
                                <Box key="userName" sx={{height:'30%', width:'80%', marginLeft: 1}}>
                                    <Typography fontSize='16px' sx={{fontFamily: "Jura, Arial", mt: 2.6, marginLeft: 1, fontWeight:'bold'}}>
                                        @{userData.length > 0 ? userData[0]['username'] : 'none'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display='flex' flexDirection='row' justifyContent='center' sx={{width: '65%', marginLeft: 0, mt:2.5, marginRight:20}}>
                                <Typography fontSize='15px' sx={{fontFamily: "Jura, Arial", mb: 1, fontWeight:'bold', marginLeft:0.8}}>
                                     {post.post_content}
                                </Typography>
                            </Box>
                            <Box display='flex' flexDirection='row' justifyContent='center' sx={{width: '50%', height: '10%', marginLeft: 34, mt:0.1}}>
                                <Typography fontSize='12px' sx={{fontFamily: "Jura, Arial", mb: 1, fontWeight:'bold'}}>
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