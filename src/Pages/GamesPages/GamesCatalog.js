
import React, {Fragment, useEffect, useState, } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import {gameComponents}  from './GameComponents';
import Typography from '@mui/material/Typography';

import snakeLogo from './images/snake logo.png';
import logo2048 from './images/2048_logo.png';
import tetrisLogo from './images/tetris logo.png';
import wordlelogo from './images/wordle_banner.png';
import pongLogo from './images/pongpicture.png';
import lightoutLogo from './images/LightsOut_Logo_.webp';
import spaceInvaders from './images/space invaders.png';
import typeLogo from './images/TypeRacer_logo.svg.png';



import Wordle from  "../GamesPages/Games/Wordle/Wordle";
import Tetris from "../GamesPages/Games/Tetris/TetrisGame";
import LightsOut from "../GamesPages/Games/Lights-Out/LightsOut";
import SpaceGame from "../GamesPages/Games/SpaceGame/SpaceShooter";
import Snake from "../GamesPages/Games/Snake/Snake";
import Game_2048 from "../GamesPages/Games/_2048/src/components/mainBoard";
import TypingMaster from "../GamesPages/Games/TypingMaster/TypingMaster";








export default function MainBoard () {

    const [selectedItem, setSelectedItem] = useState("gameBoard");


    const currentView = () => {

        switch (selectedItem) {
            case "gameBoard":

                return (
                    // <Grid container sx={{backgroundColor: '#714C7A', width: '100%', height: '100%', border:5, mt: 10, marginLeft: 0}}>
                    <Fragment>
                        <Grid container sx={{
                            backgroundColor: '#714C7A',
                            width: '100%',
                            height: '100%',
                            border: 5,
                            mt: 0,
                            marginLeft: 0
                        }}>



                            <Grid container rowSpacing={5} columnSpacing={1} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginLeft: 0,
                                backgroundColor: '#714C7A',
                                height: '100%',
                                width: '100%',
                                mt: -1,
                                padding: 5,
                                paddingTop: 0,
                                justifyContent: 'center',
                                border: 0
                            }}>
                                <Grid item justifyContent='center' xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                                    <button type="button" onClick={() => setSelectedItem("Tetris")} sx={{
                                        alignSelf: 'center',
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '69.2%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img style={{marginLeft: 2}} src={tetrisLogo} height={200} width={300}/></button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>Tetris</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                                    <button type="button" onClick={() => setSelectedItem("Wordle")} sx={{
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '69.2%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img style={{marginLeft: 2}} src={wordlelogo} height={200} width={300}/></button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>Wordle</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                                    <button type="button" onClick={() => setSelectedItem("lightsOut")} sx={{
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '69.2%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img style={{marginLeft: 2}} src={lightoutLogo} height={200} width={300}/>
                                    </button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>Lights Out</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                                    <button type="button" onClick={() => setSelectedItem("spaceInvaders")} sx={{
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '69.2%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img style={{marginLeft: 2}} src={spaceInvaders} height={200} width={300}/>
                                    </button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>Meteor Killers</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                                    <button type="button" onClick={() => setSelectedItem("snake")} sx={{
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '70%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img src={snakeLogo} height={200} width={300}/></button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>Snake</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                                    <button type="button" onClick={() => setSelectedItem("2048")}  sx={{
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '70%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img style={{}} src={logo2048} height={200} width={300}/></button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>2048</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                                    <button type="button" onClick={() => setSelectedItem("typeMaster")} sx={{
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '69.2%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img style={{marginLeft: 2}} src={typeLogo} height={200} width={300}/></button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>Typing Master</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0, alignItems: 'center'}}>
                                    <button sx={{
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor: '#4fc3f7',
                                        backgroundColor: '#b3e5fc',
                                        height: '90%',
                                        width: '69.2%',
                                        marginLeft: '13.5%',
                                        mb: '4%'
                                    }}><img src={pongLogo} height={200} width={300}/></button>
                                    <Typography sx={{textAlign: 'center', mb: 2}}>Pong</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                )
            break
            case "Tetris":
                return(
                    <Fragment>
                        <Tetris />
                    </Fragment>
                )
            case "Wordle":
                return(
                    <Fragment>
                        <Wordle />
                    </Fragment>
                )
            case "lightsOut":
                return(
                    <Fragment>
                        <LightsOut />
                    </Fragment>
                )
            case "spaceInvaders":
                return(
                    <Fragment>
                        <SpaceGame />
                    </Fragment>
                )
            case "snake":
                return(
                    <Fragment>
                        <Snake />
                    </Fragment>
                )
            case "2048":
                return(
                    <Fragment>
                        <Game_2048 />
                    </Fragment>
                )
            case "typeMaster":
                return(
                    <Fragment>
                        <TypingMaster />
                    </Fragment>
                )

            default:
                break
        }
    }

        useEffect(() => {
            console.log(`effect for login view: ${selectedItem}`);
            currentView();

        }, [selectedItem]);


        return (
            <section id="entry-page">
                {currentView()}
            </section>
        )
    }








