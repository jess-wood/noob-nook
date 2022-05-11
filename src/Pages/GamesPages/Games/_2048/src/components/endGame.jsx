import React, {useEffect, useState} from 'react'
import API from "../../../../../../API_Interface/API_Interface";


let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;







export const EndGame = ({board, onRestart}) => {
    let gameOver = false;
    let contents = '';
    let tempTiles = [];
    let score;
    //let highScore = 0;



    const [highScore, setHighScore] = useState(2);

    useEffect( () => {
        const api = new API();

        async function getUserHS() {
            const gameHSJSONString = await api.get2048HS(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            console.log(gameHSJSONString.data[0]['HS_2048']);
            setHighScore(gameHSJSONString.data[0]['HS_2048']);

        }
        async function makeNewPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, "is playing 2048!", dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewPost();
        getUserHS();
    }, [])

    const makeHighScore = () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        const api = new API();

        async function makeNewScore() {
            const gameHSJSONString = await api.postNewHighScore2048(score, window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);

        }
        async function newHSPost() {
            const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${score} points in 2048 and beat their high score  ᕕ( ᐛ )ᕗ`, dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        async function deletePost() {
            const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing 2048!");
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        deletePost();
        newHSPost();
        makeNewScore();
    }


    if (board.hasWon()) {
        contents = 'Good Job!';

        for (let i = 0; i < 16; i++){
            tempTiles.push(board.tiles[i].value)
        }

        //console.log(tempTiles)
        score = (Math.max(...tempTiles))
        //console.log(highScore);






    } else if (board.hasLost()) {
        contents = 'Game Over';
        //console.log(board)

        for (let i = 0; i < 16; i++){
            tempTiles.push(board.tiles[i].value)
        }

        //console.log(tempTiles)
        score = (Math.max(...tempTiles))
        //console.log(highScore);

        gameOver = true;

    }
    if (!contents) {
        return null;
    }

    if(gameOver){
        console.log('in game over')
        console.log(`score is  ${score} highscore is  ${highScore}`)
        if (score > highScore){
            makeHighScore();
        }
        else {
            const api = new API();
            async function deletePost() {
                const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing 2048!");
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }

            async function newGamePost() {
                const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${score} points in 2048 but didn't beat their high score  ( ಠ╭╮ಠ )`, dateTime);
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }
            deletePost();
            newGamePost();
        }
        console.log('after game over')


    }


    return (
        <div className='overlay'>
            <p className='message'>{contents}</p>
            <p highscore='score'> High Score: {score}</p>
            <button className="tryAgain" onClick={onRestart} onTouchEnd={onRestart}>Try again</button>
        </div>
    );
};
