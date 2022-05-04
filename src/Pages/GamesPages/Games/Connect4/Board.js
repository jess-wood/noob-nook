import {Fragment, useState, useEffect} from 'react';
import doWeHaveAWinner from './doWeHaveAWinner'
import { NUM_ROWS, NUM_COLUMNS, PLAYER_COLOR, AI_COLOR } from './constants'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import './Connect4.css';
import API from "../../../../API_Interface/API_Interface";

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

let moves;

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
    const [currHighScore, setCurrHighScore] = useState(0);

    useEffect(() => {
        console.log('in useEffect for user high score connect4');
        const api = new API();

        async function getUserHS() {
            const gameHSJSONString = await api.getConnect4HS(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            setCurrHighScore(gameHSJSONString.data[0]['HS_Connect4']);
        }

        async function makeNewPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, "is playing Connect4", dateTime);
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
            const gameHSJSONString = await api.postNewHighScoreConnect4(moves, window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }

        async function newHSPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, `beat the AI in ${moves+1} moves in Connect 4 and beat their high score`, dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewScore();
        newHSPost();
    }

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

    function isWinningMove(pieceColor) {
        // horizontal check
        for (let c = 0; c < NUM_COLUMNS-3; c++){
            //console.log(`horizontal check`);
            for (let r = 0; r < NUM_ROWS; r++){
                //console.log(`row: ${r}, col: ${c}, color: ${board[r][c].color}`);
                if (board[r][c].color === pieceColor && board[r][c+1] === pieceColor && board[r][c+2] === pieceColor && board[r][c+3] === pieceColor)
                    return true;
            }
        }
        // vertical check
        for (let c = 0; c < NUM_COLUMNS; c++){
            //console.log(`vertical check`);
            for (let r = 0; r < NUM_ROWS-3; r++){
                if (board[r][c].color === pieceColor && board[r+1][c] === pieceColor && board[r+2][c] === pieceColor && board[r+3][c] === pieceColor)
                    return true;
            }
        }
        // right diagonal check
        for (let c = 0; c < NUM_COLUMNS-3; c++){
            //console.log(`right diagonal check`);
            for (let r = 0; r < NUM_ROWS-3; r++){
                if (board[r][c].color === pieceColor && board[r+1][c+1] === pieceColor && board[r+2][c+2] === pieceColor && board[r+3][c+3] === pieceColor)
                    return true;
            }
        }
        // left diagonal check
        for (let c = 0; c < NUM_COLUMNS-3; c++){
            //console.log(`left diagonal check`);
            for (let r = 3; r < NUM_ROWS; r++){
                if (board[r][c].color === pieceColor && board[r-1][c+1] === pieceColor && board[r-2][c+2] === pieceColor && board[r-3][c+3] === pieceColor)
                    return true;
            }
        }

        return false;
    }

    function isTerminalNode() {
        return isWinningMove(board, PLAYER_COLOR) || isWinningMove(board, AI_COLOR);
    }

    // function isValidMove(c) {
    //     // console.log(`column passed to isValidMove: ${col}`);
    //     // console.log(JSON.stringify(board[NUM_ROWS-1][col]));
    //     // return !board[NUM_ROWS-1][col].isOccupied;
    //     return firstAvailableIndex[c];
    // }

    function getValidMoves() {
        //let validMoves = [];
        let validRowIdxs = new Array(NUM_COLUMNS).fill(0);
        //console.log(`before for loop in getValidMoves`);
        for (let c = 0; c < validRowIdxs.length; c++){
            //console.log(`in getValidMoves c is: ${c}`);
            // if (isValidMove(c))
            //     validRowIdxs.push(c);
            validRowIdxs[c] = (NUM_ROWS - 1) - firstAvailableIndex[c];
        }
        //console.log(`before getValidMoves returns`);
        //console.log(`validRowIdxs: ${validRowIdxs}`);
        return validRowIdxs;
    }

    function evaluate_row(row, piece) {
        let opp_piece = PLAYER_COLOR;
        if (piece === PLAYER_COLOR)
            opp_piece = AI_COLOR;
        let score = 0;
        let pieceCount = 0;
        let oppPieceCount = 0;
        let emptyCount = 0;
        for (let i = 0; i < row.length; i++){
            if (row[i].color === piece)
                pieceCount += 1
            else if (row[i].color === opp_piece)
                oppPieceCount += 1;
            else
                emptyCount += 1;
        }
        if (pieceCount === 4)
            score += 100;
        else if (pieceCount === 3 && emptyCount === 1)
            score += 5;
        else if (pieceCount === 2 && emptyCount === 2)
            score += 2;
        if (oppPieceCount === 3 && emptyCount === 1)
            score -= 90;
        return score;
    }

    function score_position (_board, piece) {
        let score = 0;

        // horizontal
        for (let r = 0; r < NUM_ROWS; r++){
            let row = _board[r];
            for (let c = 0; c < NUM_COLUMNS-3; c++){
                let window = row.slice(c, c+4);
                //console.log(`horizonal window: ${JSON.stringify(window)}`);
                score += evaluate_row(window, piece);
            }
        }

        // vertical
        //let vertWindow = [{row: 0, col: 0}]
        for (let c = 0; c < NUM_COLUMNS; c++){
            let col = _board.slice(c, c+4);
            console.log(`vert col: ${JSON.stringify(col)}`)
            for (let r = 0; r < NUM_ROWS-3; r++){
                let window = [_board[r][c], _board[r+1][c],_board[r+2][c], _board[r+3][c]]
                //vertWindow.push({row: r, col: c});
                //console.log(`vertical window: ${JSON.stringify(window)}`);
                score += evaluate_row(window, piece);
            }
        }

        return score;
    }

    function miniMax(depth, alpha, beta, maxingPlayer){
        let validMoves = getValidMoves();
        let isTerminal = isTerminalNode();
        let value;
        let column;
        if (depth === 0 || isTerminal){
            if (isTerminal) {
                if (isWinningMove(AI_COLOR))
                    return {column: null, value: 1000000000};
                if (isWinningMove(PLAYER_COLOR))
                    return {column: null, value: -1000000000};
                else
                    return {column: null, value: 0};
            } else {
                return {column: null, value: score_position(board, AI_COLOR)};
            }
        }
        if (maxingPlayer) {
            //column = validMoves[Math.floor(Math.random()*validMoves.length)];

            value = -Infinity;
            for (let c of validMoves){
                //row = getNextOpenRow(board, c);
                let rowIdx = firstAvailableIndex[c];
                console.log(`rowIdx = ${rowIdx}, colIdx = ${c}`);
                if (rowIdx < 0)
                    return;

                const availableIndex = firstAvailableIndex.slice();
                availableIndex[c] -= 1;
                setFirstAvailableIndex(availableIndex);


                let affectedRow = board[rowIdx].slice();
                affectedRow[c] = {
                    ...affectedRow[c],
                    color: nextColor,
                    isOccupied: true
                };

                let newBoard = board.slice();
                newBoard[rowIdx] = affectedRow;

                setBoard(newBoard);
                setNextColor(advanceColor(nextColor));

                if (doWeHaveAWinner(rowIdx, c, nextColor, newBoard)) {
                    setHaveAWinner(true);
                    setWinnerColor(nextColor);
                }
                let newScore = miniMax(depth-1, alpha, beta, false).value;
                if (newScore > value){
                    value = newScore;
                    column = c;
                }
                console.log(`max newscore: ${newScore}`);
                alpha = alpha > value ? alpha : value;
                if (alpha >= beta)
                    break;
            }
            return [{column: column, value: value}];
        } else {
            value = Infinity;
            // column = validMoves[Math.floor(Math.random()*validMoves.length)];
            console.log(`min validmoves length: ${validMoves.length}`);
            for (let c of validMoves) {
                console.log(`iterator in min: ${c}`);
                //row = getNextOpenRow(board, c);
                let rowIdx = firstAvailableIndex[c];
                if (rowIdx < 0)
                    return;

                const availableIndex = firstAvailableIndex.slice();
                availableIndex[c] -= 1;
                setFirstAvailableIndex(availableIndex);


                let affectedRow = board[rowIdx].slice();
                affectedRow[c] = {
                    ...affectedRow[c],
                    color: nextColor,
                    isOccupied: true
                };

                let newBoard = board.slice();
                newBoard[rowIdx] = affectedRow;

                setBoard(newBoard);
                setNextColor(advanceColor(nextColor));

                if (doWeHaveAWinner(rowIdx, c, nextColor, newBoard)) {
                    setHaveAWinner(true);
                    setWinnerColor(nextColor);
                }
                let newScore = miniMax(depth-1, alpha, beta, true).value;
                if (newScore < value){
                    value = newScore;
                    column = c;
                }
                console.log(`min newscore: ${newScore}`);
                beta = beta < value ? beta : value;
                if (alpha >= beta)
                    break;
            }
            return [{column: column, value: value}];
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
                let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date+' '+time;

                setHaveAWinner(true);
                setWinnerColor(nextColor);
                const api = new API();
                async function deletePost() {
                    const gameHSJSONString = await api.deleteUserPost(window.currentUserLoggedIn, "is playing Connect4");
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                deletePost();
                if (currHighScore === 0 || moves < currHighScore) {
                    makeNewHighScore();
                } else {
                    async function newGamePost() {
                        const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `beat the AI in ${moves+1} moves in Connect4 but didn't beat their high score :(`, dateTime);
                        console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                    }
                    newGamePost();
                }
            }
        } else {
            miniMax(3, -Infinity, Infinity, true);
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



