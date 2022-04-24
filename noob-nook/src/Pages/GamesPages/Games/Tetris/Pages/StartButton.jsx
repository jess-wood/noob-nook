import React from 'react';
import { StyledStartButton } from '../utils/StyledStartButton';

const StartButton = ({ callBack, gameStart }) => {
    return (
        <StyledStartButton onClick={callBack}>{gameStart ? "Replay" : "Play"}</StyledStartButton>
    )
}

export default StartButton;