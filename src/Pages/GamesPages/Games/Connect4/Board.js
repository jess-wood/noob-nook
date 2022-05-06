import {Fragment, useState} from 'react';
import doWeHaveAWinner from './doWeHaveAWinner'
import { NUM_ROWS, NUM_COLUMNS, PLAYER_COLOR, AI_COLOR } from './constants'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import './Connect4.css';

let moves;
let invalidMoves =[]

function advanceColor(color) {
    if( color === 'white' )
        return 'blue';
    if( color === 'blue' )
        return 'red';
    return 'blue';
}

function ResetButton (props) {
    return (
        <Box display='flex' justifyContent='center' sx={{mb: 5, mt: 5, align: 'center'}}>
            <Button size="large" variant="contained" align="center" onClick={() => props.reset()} color='error'>RESET</Button>
        </Box>
    );
}

function TopBanner (props) {
    return (
        <Box display='flex' flexDirection='column'>
            <Box>
                <Typography className='head' sx={{fontFamily: 'Fredoka One, cursive', fontWeight: 'bold', fontSize: '65px', textAlign: 'center', color: '#077826'}}>
                    CONNECT 4
                </Typography>
            </Box>
        </Box>
    );
}

function Cell(props) {

    const {cell} = props;

    return (
        <Box sx={{
            width: 50,
            height: 50,
            backgroundColor: cell['color'],
            border: 1,
            borderColor: 'black',
            borderRadius: '50%'}}
        />
    );
}


function Row(props) {
    const {onClickCallback, row} = props;

    return (
        <Grid container columns={7}
              sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  mb: 0.5,
              }}
        >
            {
                row.map((cell, idx) =>
                    <Grid item xs={1} key={idx} onClick={() => onClickCallback(idx)}>
                        <Cell cell={cell}
                              colIdx={idx}/>
                    </Grid>
                )
            }
        </Grid>
    )
}

let key = 1;
function uniqueKey() {
    return key++;
}


function createInitialBoard() {
    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: "white", isOccupied: false}));
    return board.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));

}

function TopMessage(props) {
    let winMsg = ""
    let playerMsg = "";
    let bgColor ='';
    if( ! props.haveAWinner) {
        const playerColor = props.nextColor.charAt(0).toUpperCase() + props.nextColor.slice(1);
        if (playerColor === 'Blue') {
            bgColor = '#1a13a8';
            playerMsg = "Your move!";
        }
        else if (playerColor === 'Red') {
            bgColor = '#b31712';
            playerMsg = "Click to view AI's move";
        }

        return <Box
            sx={{display: 'flex', flexDirection: 'column', height: 100, alignContent: 'center', backgroundColor: bgColor, mb: 3, borderRadius: '20px'}}
        >
            <Box sx={{mt: 4}}>
                <Typography variant='h5' className='player' sx={{fontFamily: 'Fredoka One, cursive', textAlign: 'center', color: 'white'}}>
                    {playerMsg}
                </Typography>
            </Box>
        </Box>
    }

    const winnerColor = props.winnerColor.charAt(0).toUpperCase() + props.winnerColor.slice(1);
    let winColor = '';
    if (winnerColor === 'Blue') {
        winColor = '#1a13a8';
        winMsg = `You Beat the AI in ${moves + 1} moves!`;
    }else if (winnerColor === 'Red') {
        winColor = '#b31712';
        winMsg = "The AI Beat You :(";
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', height: 100, alignContent: 'center', backgroundColor: winColor, mb: 3, borderRadius: '20px'}}>
        <Box sx={{mt: 4}}>
            <Typography variant='h5' className='player' sx={{fontFamily: 'Fredoka One, cursive', textAlign: 'center', color: 'white'}}>
                {winMsg}
            </Typography>
        </Box>
    </Box>
}


export default function Board(props) {
    const [board, setBoard ] = useState(createInitialBoard);
    const [haveAWinner, setHaveAWinner] = useState(false);
    const [nextColor, setNextColor] = useState('blue');
    const [winnerColor, setWinnerColor] = useState(undefined);
    const [numMovesToWin, setNumMovesToWin] = useState(0);
    const [firstAvailableIndex, setFirstAvailableIndex] = useState(Array(NUM_COLUMNS).fill(NUM_ROWS - 1));
    const [winMove, setWinMove] = useState({isWin: false, row: -1, col: -1})


    const reset = () => {
        setBoard(createInitialBoard());
        setHaveAWinner(false);
        setNextColor('blue');
        setFirstAvailableIndex(Array(NUM_COLUMNS).fill(NUM_ROWS - 1));
        setNumMovesToWin(0);
    };

    const NumMoves = (props) => {
        return (
            <Typography className='num-moves' sx={{fontFamily: 'Fredoka One, cursive', textAlign: 'center', color: 'black', fontSize: '20px'}}>
                NUMBER OF MOVES YOU HAVE MADE: {numMovesToWin}
            </Typography>
        );
    };

    function isWinMove (row, col, piece){
        // horizontal check
        if (col+3 < NUM_COLUMNS && board[row][col+1].color === piece && board[row][col+2].color === piece && board[row][col+3].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (col-3 >= 0 && board[row][col-1].color === piece && board[row][col-2].color === piece && board[row][col-3].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (col+2 < NUM_COLUMNS && col-1 >= 0 && board[row][col-1].color === piece && board[row][col+1].color === piece && board[row][col+2].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (col+1 < NUM_COLUMNS && col-2 >= 0 && board[row][col-2].color === piece && board[row][col-1].color === piece && board[row][col-2].color === piece && row === firstAvailableIndex[col])
            return true;

        // vertical check
        else if (row+3 < NUM_ROWS && board[row+1][col].color === piece && board[row+2][col].color === piece && board[row+3][col].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row+2 < NUM_ROWS && row-1 >= 0 && board[row+2][col].color === piece && board[row+1][col].color === piece && board[row-1][col].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row+1 < NUM_ROWS && row-2 >= 0 && board[row+1][col].color === piece && board[row-1][col].color === piece && board[row-2][col].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row-3 > 0 && board[row-3][col].color === piece && board[row-2][col].color === piece && board[row-1][col].color === piece && row === firstAvailableIndex[col])
            return true;

        // right diagonal check
        else if (row+3 < NUM_ROWS && col+3 < NUM_COLUMNS && board[row+1][col+1].color === piece && board[row+2][col+2].color === piece && board[row+3][col+3].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row+2 < NUM_ROWS && row-1 > 0 && col+2 < NUM_COLUMNS && col-1 > 0 && board[row-1][col-1].color === piece && board[row+1][col+1].color === piece && board[row+2][col+2].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row+1 < NUM_ROWS && row-2 > 0 && col+1 < NUM_COLUMNS && col-2 > 0 && board[row+1][col+1].color === piece && board[row-1][col-1].color === piece && board[row-2][col-2].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row-3 > 0 && col-3 > 0 && board[row-1][col-1].color === piece && board[row-2][col-2].color === piece && board[row-3][col-3].color === piece && row === firstAvailableIndex[col])
            return true;

        // left diagonal check
        else if (row+3 < NUM_ROWS && col-3 > 0 && board[row+1][col-1].color === piece && board[row+2][col-2].color === piece && board[row+3][col-3].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row+2 < NUM_ROWS && row-1 > 0 && col-2 > 0 && col+1 < NUM_COLUMNS && board[row+1][col-1].color === piece && board[row+2][col-2].color === piece && board[row-1][col+1].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row+1 < NUM_ROWS && row-2 > 0 && col-1 > 0 && col+2 < NUM_COLUMNS && board[row+1][col-1].color === piece && board[row-1][col+1].color === piece && board[row-2][col+2].color === piece && row === firstAvailableIndex[col])
            return true;
        else if (row-3 > 0 && col+3 < NUM_COLUMNS && board[row-1][col+1].color === piece && board[row-2][col+2].color === piece && board[row-3][col+3].color === piece && row === firstAvailableIndex[col])
            return true;

        return false;
    }

    function randomOppMove () {
        let colIdx = Math.floor(Math.random() * firstAvailableIndex.length)
        let rowIdx = firstAvailableIndex[colIdx];
        for (let i = 0; i < NUM_ROWS; i++){
            for (let j = 0; j < NUM_COLUMNS; j++){
                if (isWinMove(i, j, AI_COLOR)){
                    rowIdx = i;
                    colIdx = j;
                    break;
                }
                if (isWinMove(i, j, PLAYER_COLOR)){
                    rowIdx = i;
                    colIdx = j;
                    break;
                }
            }
        }
        if (firstAvailableIndex[colIdx] === -1){
            let temp = Math.floor(Math.random() * firstAvailableIndex.length);
            while (temp === colIdx){
                temp = Math.floor(Math.random() * firstAvailableIndex.length);
            }
            colIdx = temp;
        }

        if (invalidMoves.some(elem => JSON.stringify(elem) === JSON.stringify([rowIdx, colIdx]))){
            rowIdx = firstAvailableIndex[colIdx];
        }
        invalidMoves.push([rowIdx, colIdx]);
        const availableIndex = firstAvailableIndex.slice();
        availableIndex[colIdx] -= 1;
        setFirstAvailableIndex(availableIndex);

        let affectedRow = board[rowIdx].slice();
        affectedRow[colIdx] = {
            ...affectedRow[colIdx],
            color: nextColor,
            isOccupied: true
        };
        let newBoard = board.slice();
        newBoard[rowIdx] = affectedRow;

        setBoard(newBoard);
        setNextColor(advanceColor(nextColor));

        if (doWeHaveAWinner(rowIdx, colIdx, nextColor, newBoard)) {
            setHaveAWinner(true);
            setWinnerColor(nextColor);

        }
    }

    function onClickCallback(colIdx) {
        if( haveAWinner )
            return;
        if (nextColor === 'blue') {
            let rowIdx = firstAvailableIndex[colIdx];
            //console.log(`rowIdx = ${rowIdx}, colIdx = ${colIdx}`);
            if (rowIdx < 0)
                return;

            const availableIndex = firstAvailableIndex.slice();
            availableIndex[colIdx] -= 1;
            setFirstAvailableIndex(availableIndex);

            if (nextColor === 'blue' && firstAvailableIndex.length > 0) {
                setNumMovesToWin(numMovesToWin + 1);
                moves = numMovesToWin;
            }


            let affectedRow = board[rowIdx].slice();
            affectedRow[colIdx] = {
                ...affectedRow[colIdx],
                color: nextColor,
                isOccupied: true
            };

            let newBoard = board.slice();
            newBoard[rowIdx] = affectedRow;

            setBoard(newBoard);
            setNextColor(advanceColor(nextColor));

            if (doWeHaveAWinner(rowIdx, colIdx, nextColor, newBoard)) {
                setHaveAWinner(true);
                setWinnerColor(nextColor);
            }
            invalidMoves.push([rowIdx, colIdx]);
        } else {
            randomOppMove();
            //miniMax(3, -Infinity, Infinity, true);
        }
    }

    return (
        <Fragment>
            <Grid container columns={2} sx={{justifySelf: 'center', justifyContent: 'center', justifyItems: 'center', backgroundColor: '#c2f6ff', width: 2000}}>
                <Grid item>
                    <Stack sx={{width: 7 * 50 + 6 * 7, m: 'auto', mt: 15, mb: 20}}
                    >
                        <TopBanner reset={reset}/>
                        <TopMessage nextColor={nextColor}
                                    winnerColor={winnerColor}
                                    haveAWinner={haveAWinner}
                                    reset={reset} />
                        <Box sx={{borderRadius: '10px', border: 1, backgroundColor: '#ffd500', mb: 5, padding: 0.5}}>
                            {
                                board.map((row, rowIdx) =>
                                    <Row key={rowIdx}
                                         row={row}
                                         rowIdx={rowIdx}
                                         onClickCallback={(colIdx) => onClickCallback(colIdx)}
                                    />
                                )
                            }
                        </Box>
                        <NumMoves/>
                        <ResetButton reset={reset}/>
                    </Stack>
                </Grid>
            </Grid>
        </Fragment>
    );
}



