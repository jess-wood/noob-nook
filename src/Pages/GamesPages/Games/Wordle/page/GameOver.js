import {Fragment, useState} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import {green, grey, orange} from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const GameOver = (props) => {
    const {gameOver, gameWon,} = props;
    if(gameOver) {
        if (gameWon) {
            return (
                <Alert severity="success">
                    <AlertTitle>GAME OVER!</AlertTitle>
                    Congratulations, you beat Wordle! — <strong>Play again?</strong>
                </Alert>
            );
        } else {
            return (
                <Alert severity="error">
                    <AlertTitle>GAME OVER!</AlertTitle>
                    Sorry, you lost Wordle! — <strong>Try again?</strong>
                </Alert>
            );
        }
    }
    else {
        return (
            <Box></Box>
        )
    }
}

export default GameOver;