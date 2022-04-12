import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../Login/Login.css';
import Wordle from "./Games/Wordle/Wordle";
import LightsOut from "./Games/Lights-Out/LightsOut";
import Snake from "./Games/Snake/Snake";
import Tetris from "./Games/Tetris/TetrisGame";
import SpaceShooter from "./Games/SpaceGame/SpaceShooter";

const GameCatalog = (props) => {
    console.log("in games catalog");
    return (
        <Tetris/>
    )
}

export default GameCatalog;

//Testing games in here, change to whichever game you want to test