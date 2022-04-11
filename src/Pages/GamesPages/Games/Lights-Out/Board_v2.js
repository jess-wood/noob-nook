import React, {useState, Fragment} from "react";
import {Component} from "react";
import Cell from './Cell';
import {Box, Fade, Grid, Stack} from "@mui/material";
import './utils/Board.css';

//global constants
const NUM_ROWS = 5;
const NUM_COLS = 5;
const notLit = '#263238';
const lit = '#00bcd4';
let numTurns = 0;

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
    for (let i=0; i < board.length; i++){
        for (let j=0; j < board[i].length; j++){
            if(Math.random() < 0.25 && numLit < 10){
                console.log(`row=${i} col=${j}`);
                console.log(board[i][j]);
                board[i][j] = attrL;
                numLit++;
            }
            else {
                board[i][j] = attrNL;
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

    const reset = () => {
        setBoard(createInitialBoard);
        setWinner(false);
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
        numTurns+=1;
        //check for winner
        if (checkBoard(newBoard)){
            setWinner(true);
            return;
        }
    }

    return (
        <Fragment>
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
            </Stack>
        </Fragment>
    )
}

export default Board_v2;