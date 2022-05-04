import React, {useState, Fragment, useEffect} from "react";
import {Component} from "react";
import Cell from './Cell';
import {Box, Fade, Grid, Stack} from "@mui/material";
import './utils/Board.css';
import API from "../../../../API_Interface/API_Interface";
import Button from "@mui/material/Button";

//global constants
const NUM_ROWS = 5;
const NUM_COLS = 5;
const notLit = '#263238';
const lit = '#00bcd4';
let numMoves = 0;
let score = 0;
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

function Cell1(props) {

    const {cell} = props;

    return (
        <Box sx={{
            width: 100,
            height: 100,
            backgroundColor: cell['color'],
            border: 1,
            borderColor: 'black',
            transition: '0.5s ease'
           // transition: background-color 0.5s ease
            //borderRadius: '50%'
            }}
        />
    );
}

function Row(props) {
    const {onClickCallback, row, rowIdx} = props;

    return (
        <Grid container columns={5}
              sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  //mb: 0.5,
                  //marginLeft: 3
              }}
        >
            {
                row.map((cell, idx) =>
                    <Grid item xs={1} key={idx} onClick={() => onClickCallback(rowIdx, idx)}>
                        <Cell1 cell={cell}
                              colIdx={idx}/>
                    </Grid>
                )
            }
        </Grid>
    )
}

function checkBoard(board){
    for (let i=0; i < board.length; i++){
        for (let j=0; j < board[i].length; j++){
            if (board[i][j].color !== lit && board[i][j].isLit !== true){
                return false;
            }
        }
    }
    //before returning must save score
    if (numMoves < 11) //lowest moves and highest score
        score = 100000;
    else{
        score = 100000 - (numMoves*410);
    }
    return true;
}

function createInitialBoard(){
    //let board = new Array(NUM_ROWS).fill(new Array(NUM_COLS).fill({color: notLit,isLit: false}));
    let attrNL = {color: notLit,isLit: false};
    let attrL = {color: lit,isLit: true};
    let board = [];
    //fix this to create board
    for (let i=0; i < NUM_ROWS; i++){
        let row = [];
        for (let j=0; j<NUM_COLS; j++){
            row.push(attrNL);
        }
        board.push(row);
    }
    //randomize lights on
    let numLit = 0;
    // for (let i=0; i < board.length; i++){
    //     for (let j=0; j < board[i].length; j++){
    //         if(Math.random() < 0.6 && numLit < 9){
    //             console.log(board[i][j]);
    //             board[i][j] = attrL;
    //             numLit++;
    //         }
    //         else {
    //             board[i][j] = attrNL;
    //         }
    //     }
    // }
    if (Math.random() < 0.5){
        for (let i=0; i < board.length; i++){
            for (let j=0; j < board[i].length; j++){
                if (i === 0 || i === 4){
                    if (j===1 || j===2 || j===3){
                        board[i][j] = attrL;
                    }
                }
                else if (i === 1 || i === 3){
                    if (j % 2 === 0){
                        board[i][j] = attrL;
                    }
                }
                else if (i === 2){
                    if (j !== 2){
                        board[i][j] = attrL;
                    }
                }
            }
        }
    }
    else {
        for (let i=0; i < board.length; i++){
            for (let j=0; j < board[i].length; j++){
                if (i === 0 || i === 1 || i === 3 || i === 4){
                    if (j % 2 === 0){
                        board[i][j] = attrL;
                    }
                }
            }
        }
    }
    return board.map((row, rowIdx) => row.map((col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, col: colIdx}
    }));
}

const Board_v2 = (props) => {
    const [board, setBoard] = useState(createInitialBoard);
    const [haveAwinner, setWinner] = useState(false);
    const [currHighScore, setCurrHighScore] = useState(0);


    useEffect(() => {
        console.log('in useEffect for user high score lights out');
        const api = new API();

        async function getUserHS() {
            const gameHSJSONString = await api.getLOHS( window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            setCurrHighScore(gameHSJSONString.data[0]['HS_LightsOut']);
        }
        async function makeNewPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, "is playing Lights Out!", dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        getUserHS();
        makeNewPost();
    }, [currHighScore]);

    const makeNewHighScore = () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        const api = new API();

        async function makeNewScore() {
            const gameHSJSONString = await api.postNewHighScoreLO(score, window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            //setCurrHighScore(gameHSJSONString.data);
        }
        //update post here
        async function newHSPost() {
            const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${score} points in Lights Out and beat their high score  ⊂( ・ ̫・)⊃`, dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewScore();
        newHSPost();
    }


    const reset = () => {
        setBoard(createInitialBoard);
        setWinner(false);
        setCurrHighScore(0);
    }

    function onClickCallback(rowIdx, colIdx){
       if (haveAwinner){
           return;
       }
        //will always change the current cell
        let newBoard = board.slice();
        let affectedRow = board[rowIdx].slice();
        affectedRow[colIdx] = {
            ...affectedRow[colIdx],
            color: affectedRow[colIdx].isLit ? notLit : lit,
            isLit: !affectedRow[colIdx].isLit
        }
        if ((rowIdx === 0 || rowIdx === 4) && (colIdx === 0 || colIdx === 4)){ //corner case
            if (colIdx === 0) { //right side corners
                affectedRow[colIdx + 1] = {
                    ...affectedRow[colIdx + 1],
                    color: affectedRow[colIdx + 1].isLit ? notLit : lit,
                    isLit: !affectedRow[colIdx + 1].isLit
                }
            }
            else if (colIdx === 4) { //left corners
                affectedRow[colIdx - 1] = {
                    ...affectedRow[colIdx - 1],
                    color: affectedRow[colIdx - 1].isLit ? notLit : lit,
                    isLit: !affectedRow[colIdx - 1].isLit
                }
            }
            if (rowIdx === 0) { //top corner
                let nextAffectedRow = board[rowIdx + 1].slice();
                nextAffectedRow[colIdx] = {
                    ...nextAffectedRow[colIdx],
                    color: nextAffectedRow[colIdx].isLit ? notLit : lit,
                    isLit: !nextAffectedRow[colIdx].isLit
                }
                newBoard[rowIdx+1] = nextAffectedRow;
            }
            else if (rowIdx === 4) { //bottom corner
                let nextAffectedRow = board[rowIdx - 1].slice();
                nextAffectedRow[colIdx] = {
                    ...nextAffectedRow[colIdx],
                    color: nextAffectedRow[colIdx].isLit ? notLit : lit,
                    isLit: !nextAffectedRow[colIdx].isLit
                }
                newBoard[rowIdx-1] = nextAffectedRow;
            }
            //set board
            newBoard[rowIdx] = affectedRow;
            setBoard(newBoard);
        }
        else if ((colIdx !== 0 && colIdx !== 4) && (rowIdx !== 0 && rowIdx !== 4)) { //middle case
            affectedRow[colIdx-1] = {
                ...affectedRow[colIdx - 1],
                color: affectedRow[colIdx - 1].isLit ? notLit : lit,
                isLit: !affectedRow[colIdx - 1].isLit
            }

            affectedRow[colIdx+1] = {
                ...affectedRow[colIdx + 1],
                color: affectedRow[colIdx + 1].isLit ? notLit : lit,
                isLit: !affectedRow[colIdx + 1].isLit
            }
            let affectedRowUp = board[rowIdx-1].slice();
            affectedRowUp[colIdx] = {
                ...affectedRowUp[colIdx],
                color: affectedRowUp[colIdx].isLit ? notLit : lit,
                isLit: !affectedRowUp[colIdx].isLit
            }
            let affectedRowDown = board[rowIdx+1].slice();
            affectedRowDown[colIdx] = {
                ...affectedRowDown[colIdx],
                color: affectedRowDown[colIdx].isLit ? notLit : lit,
                isLit: !affectedRowDown[colIdx].isLit
            }
            //let newBoard = board.slice();
            newBoard[rowIdx] = affectedRow;
            newBoard[rowIdx-1] = affectedRowUp;
            newBoard[rowIdx+1] = affectedRowDown;
            setBoard(newBoard);
        }
        else { //edge cases
            if (rowIdx === 0 || rowIdx === 4){ // top and bottom
                affectedRow[colIdx-1] = {
                    ...affectedRow[colIdx - 1],
                    color: affectedRow[colIdx - 1].isLit ? notLit : lit,
                    isLit: !affectedRow[colIdx - 1].isLit
                }
                affectedRow[colIdx+1] = {
                    ...affectedRow[colIdx + 1],
                    color: affectedRow[colIdx + 1].isLit ? notLit : lit,
                    isLit: !affectedRow[colIdx + 1].isLit
                }
                if (rowIdx === 0){ //top
                    let nextAffectedRow = board[rowIdx + 1].slice();
                    nextAffectedRow[colIdx] = {
                        ...nextAffectedRow[colIdx],
                        color: nextAffectedRow[colIdx].isLit ? notLit : lit,
                        isLit: !nextAffectedRow[colIdx].isLit
                    }
                    newBoard[rowIdx+1] = nextAffectedRow;
                }
                else { //bottom
                    let nextAffectedRow = board[rowIdx - 1].slice();
                    nextAffectedRow[colIdx] = {
                        ...nextAffectedRow[colIdx],
                        color: nextAffectedRow[colIdx].isLit ? notLit : lit,
                        isLit: !nextAffectedRow[colIdx].isLit
                    }
                    newBoard[rowIdx-1] = nextAffectedRow;
                }
                newBoard[rowIdx] = affectedRow;
                setBoard(newBoard);
            }
            else { //side edges
                let affectedRowUp = board[rowIdx-1].slice();
                affectedRowUp[colIdx] = {
                    ...affectedRowUp[colIdx],
                    color: affectedRowUp[colIdx].isLit ? notLit : lit,
                    isLit: !affectedRowUp[colIdx].isLit
                }

                let affectedRowDown = board[rowIdx+1].slice();
                affectedRowDown[colIdx] = {
                    ...affectedRowDown[colIdx],
                    color: affectedRowDown[colIdx].isLit ? notLit : lit,
                    isLit: !affectedRowDown[colIdx].isLit
                }
                if (colIdx === 0){ //left side
                    affectedRow[colIdx+1] = {
                        ...affectedRow[colIdx + 1],
                        color: affectedRow[colIdx + 1].isLit ? notLit : lit,
                        isLit: !affectedRow[colIdx + 1].isLit
                    }
                }
                else { //right side
                    affectedRow[colIdx-1] = {
                        ...affectedRow[colIdx - 1],
                        color: affectedRow[colIdx - 1].isLit ? notLit : lit,
                        isLit: !affectedRow[colIdx - 1].isLit
                    }
                }

                newBoard[rowIdx] = affectedRow;
                newBoard[rowIdx+1] = affectedRowDown;
                newBoard[rowIdx-1] = affectedRowUp;
                setBoard(newBoard);
            }
        }
        numMoves+=1;
        //check for winner
        if (checkBoard(newBoard)){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
            setWinner(true);
            const api = new API();
            async function deletePost() {
                const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Lights Out!");
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }
            deletePost();

            if (score > currHighScore){
                makeNewHighScore();
            }
            else {
                async function newGamePost() {
                    const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${score} points in Lights Out but didn't beat their high score  ಥ_ಥ`, dateTime);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                newGamePost();
            }
            return;
        }
    }

    return (
        <Fragment>
            <Box className='body2' sx={{height: '100%', width: '100%'}}>
            <Stack>
                {haveAwinner ?
                    <div className='winner'>
                        <div className='neon-orange'>you</div>
                        <div className='neon-blue'>win</div>
                    </div>
                    :
                    <div className='Board-title'>
                        <div className='neon-orange'>Lights</div>
                        <div className='neon-blue'>Out</div>
                    </div>
                }
            <Grid container columns={5} align={'center'} className={'Board'} sx={{width: 500}}>
                {
                    board.map((row, rowIdx) =>
                        <Row key={rowIdx}
                        row={row}
                        rowIdx={rowIdx}
                        onClickCallback={(rowIdx, colIdx) => onClickCallback(rowIdx, colIdx)} />
                    )
                }
            </Grid>
            <Button sx={{width: '10%', alignSelf: 'center', mt: '3.5%', color: '#FED128'}} onClick={() => reset()}>Reset</Button>
            </Stack>
            </Box>
        </Fragment>
    )
}

export default Board_v2;

//fix delete post