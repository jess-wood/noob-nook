import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from './TestUser/profPicSample.jpeg';
import '../Login/Login.css';
import {Card, CardMedia, Grid} from "@mui/material";
import {AddCircleOutlineOutlined} from '@mui/icons-material';


const testUser = [
    {
        fullName: "Jane Doe",
        username: "@slick_doe",
        rank: 'Noob',
        profilePic: image,
        dateJoined: '03/25/22',
        posts: ["@slick_doe played Wordle", "@slick_doe beat their high score in Lights Out"]
    }
];

const testHighScores = [
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
    }
];

const ActivityFeed = (props) => {

}

const UserInformation = (props) => {

}

const UserProfile = (props) => {
    console.log("in profile");
    return (
        <Grid container position='fixed' style={{
            minWidth: "100%",
            height: "100%",
            backgroundColor: '#714C7A'
        }} direction='row'  columns={2} sx={{display:'flex', border: 1,}}>
            <Grid item key={'left'} style={{
                minWidth: "50%",
                height: "100%",
            }} sx={{}}>
                <Grid container style={{border: 2}} sx={{border: 5, display: 'flex', flexDirection: 'row', width:'100%'}}>
                    <Grid item key={"ProfilePic"} sx={{border: 0, width: '50%'}}>
                        <Card key={"profilePic"} sx={{border: 2, borderRadius: '50%', height: '60%', marginLeft: 4, width: '75%', mt: 5}}>
                            <CardMedia style={{width: 250, height: 250, justifySelf: 'center'}} image={require('./TestUser/profPicSample.jpeg')} title={"profilePic"}/>
                        </Card>
                        <Button key={'follow'} sx={{marginLeft: 13, mt: 3, mb: 3}}> Follow <AddCircleOutlineOutlined/></Button>
                    </Grid>
                    <Grid item key={"UserInfo"} sx={{border: 0, width: '50%', alignItems: 'center'}}>
                        <Box key={testUser[0].fullName} sx={{border: 1, mt: 10, width: 'fit-content', marginLeft: 3}}>
                            <h3>{testUser[0].fullName}</h3>
                        </Box>
                        <Box key={testUser[0].username} sx={{border: 1, mt: 3, width: 'fit-content', marginLeft: 3}}>
                            <h3>{testUser[0].username}</h3>
                        </Box>
                        <Box key={testUser[0].dateJoined} sx={{border: 1, mt: 3, width: 'fit-content', marginLeft: 3}}>
                            <h3>A noob since {testUser[0].dateJoined}</h3>
                        </Box>
                        <Box key={testUser[0].rank} sx={{border: 1, mt: 3, width: 'fit-content', marginLeft: 3}}>
                            <h3>Rank: {testUser[0].rank}</h3>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{width: '100%', border: 1}}>
                    <Grid item key={'highscores'} sx={{ width: '100%'}}>
                        <Typography fontWeight='bold' fontSize='25px' sx={{mt: 0.5, mb: 0.5, textAlign: 'center', fontFamily: "Jura, Arial"}}>High Scores</Typography>
                        {
                            testHighScores.map(score =>
                                <Box key={score.game} sx={{marginLeft: 3, mt: 0.5, mb: 1}}>
                                    <Typography fontWeight='bold' sx={{mt: 0.5, mb: 0.5, fontFamily: "Jura, Arial"}}>{score.game}: {score.score}</Typography>
                                </Box>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item key={'ActivityFeed'} style={{
                minWidth: "50%",
                height: "100%",
            }} sx={{border: 1, display:'flex',flexDirection:'column' }}>
                <Box sx={{width: '100%', height: '8%', alignItems: 'center', fontSize: 30}}>
                    <Typography sx={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center', fontFamily: "Jura, Arial"}}>
                        Activity Feed
                    </Typography>
                </Box>
                {
                    testUser[0].posts.map(post =>
                        <Box key={post} sx={{width: '100%', height: '8%', border: 1, justifyContent: 'center'}}>
                            {post}
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