import './utils/typingMaster.css'
import * as React from "react";
import {Fragment, useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import API from "../../../../API_Interface/API_Interface";
import Box from "@mui/material/Box";


let m_idx = 1;
let charsTyped=0;
let words = 0;

// define quotes to be used
let quotes_array = [
    "Push yourself, because no one else is going to do it for you.",
    "Failure is the condiment that gives success its flavor.",
    "Wake up with determination. Go to bed with satisfaction.",
    "It's going to be hard, but hard does not mean impossible.",
    "Learning never exhausts the mind.",
    "The only way to do great work is to love what you do.",
    "Stay close to anything that makes you glad you are alive.",
    "Make each day your masterpiece.",
    "Keep your face to the sunshine and you cannot see a shadow.",
    "Impossible is for the unwilling.",
    "No pressure, no diamonds.",
    "Stay foolish to stay sane.",
    "Whatever you are, be a good one.",
    "To be the best, you must be able to handle the worst."
];

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;


const TypingMaster = (props) => {

    const getCurrHS = () => {
        const api = new API();

        async function getUserHS() {
            const gameHSJSONString = await api.getTypingHS(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            console.log(gameHSJSONString.data[0]['HS_Typing']);
            setHighScore(gameHSJSONString.data[0]['HS_Typing']);

        }
        async function makeNewPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, "is playing Typing Master!", dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewPost();
        getUserHS();
    }

    //function to start game
    function startGame() {
        setMSG(quotes_array[0]);
        // clear old and start a new timer
        clearInterval(timeRemaining)
        setIsActive(true);
        setIsPaused(false);
    }

    //function to process user text
    function processCurrentText() {
        console.log(`hs=${highScore}`);
        //split user text and message to array of chars
        let curr_input_array = userText.split('');
        let curr_msg_array = msg.split('');
        //increment total chars typed
        charsTyped += 1;
        let msg_Arr = [];

        for (let i=0; i < curr_msg_array.length; i++){
            let curr_el = {char: curr_msg_array[i], style: "regular"};
            msg_Arr.push(curr_el);
        }

        //keep track of errors
        let curr_errors = 0;
        curr_msg_array.forEach((char, idx) => {
            let curr_user_char = curr_input_array[idx];

            //check all chars
            if (curr_user_char === undefined){ //correct or no char
                //nothing to be done
            }
            else if (curr_user_char === char){
                msg_Arr[idx].style = 'correct_char';
            }
            else { //incorrect
                msg_Arr[idx].style = 'incorrect_char';
                curr_errors += 1;
            }
        });

        //update error count and accuracy
        setErrors(curr_errors);

        let correctCharacters = (charsTyped - (errors));
        let accuracyVal = ((correctCharacters / charsTyped) * 100);
        setAccuracy(Math.round(accuracyVal));

        if (userText.length+1 === msg.length) {
            userText.split(" ").forEach((word, idx) => {
                //console.log(word);
                words += 1;
            });
            //console.log(words);
        }

    }

    //function to finish game
    function finishGame() {
        // stop the timer
        clearInterval(timeRemaining);
        setIsPaused(true);

        // show finishing text
        setMSG("Click on restart to start a new game.");

        setCPM(charsTyped);
        setWPM(words);
        console.log(`wpm=${wpm} and hs=${highScore}`);
        if (wpm > highScore){
            const api = new API();

            async function makeNewScore() {
                const gameHSJSONString = await api.postNewHighScoreWPM(wpm, window.currentUserLoggedIn);
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                //setCurrHighScore(gameHSJSONString.data);

            }
            async function newHSPost() {
                const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `typed ${wpm} words in Typing Master and beat their high score!`, dateTime);
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }
            async function deletePost() {
                const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Typing Master!");
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }
            deletePost();
            newHSPost();
            makeNewScore();
        }
        else {
            const api = new API();
            async function newPost() {
                const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `typed ${wpm} words in Typing Master but didn't beat their high score :(`, dateTime);
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }
            async function deletePost() {
                const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Typing Master!");
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }
            deletePost();
            newPost();
        }
    }

    function resetGame() {
        setUserText("");
        setWPM(0);
        setCPM(0);
        setIsGameOver(false);
        setIsPaused(true);
        setIsActive(false);
        setMSG("Click on the area below to start the game.");
        setAccuracy(100);
        setErrors(0);
        setTimeRemaining(60);
        charsTyped=0;
        words = 0;
        m_idx = 1;
    }



    //state variables
    const [userText, setUserText] = useState("");
    const [wpm, setWPM] = useState(0);
    const [cpm, setCPM] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [msg, setMSG] = useState("Click on the area below to start the game.");
    const [highScore, setHighScore] = useState(getCurrHS);

    React.useEffect(() => {
        if (userText.length === msg.length) {
            setUserText("");
            setMSG(quotes_array[m_idx]);
            m_idx += 1;
        }
    }, [userText, msg.length]);

    React.useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTimeRemaining((time) => time - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        if (timeRemaining <=0 ){
            setIsGameOver(true);
            finishGame();
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused, timeRemaining]);

    //console.log(`type of ${typeof msg}`);

    return (
        <Fragment>
            <Box className="body1" >
            <div className="container">
                <div className="heading">
                    Typing Master
                </div>
                <div className="header">
                    {isGameOver ? <div className="wpm">
                        <div className="header_text">WPM</div>
                        <div className="curr_wpm">{wpm}</div>
                    </div> : <div></div>}
                    {isGameOver ? <div className="cpm">
                        <div className="header_text">CPM</div>
                        <div className="curr_cpm">{cpm}</div>
                    </div> : <div></div>}
                    <div className="errors">
                        <div className="header_text">Errors</div>
                        <div className="curr_errors">{errors}</div>
                    </div>
                    <div className="timer">
                        <div className="header_text">Time</div>
                        <div className="curr_time">{timeRemaining}s</div>
                    </div>
                    <div className="accuracy">
                        <div className="header_text">% Accuracy</div>
                        <div className="curr_accuracy">{accuracy}</div>
                    </div>
                </div>

                <div className="quote">
                    {typeof msg === "object" ? console.log("is object") && msg.map(ele =>
                        <Typography className={ele.style} sx={{fontFamily: "Special Elite, cursive"}}>{ele.char}</Typography>
                    ) : msg}
                </div>
                <textarea className="input_area"
                          placeholder="start typing here..."
                          value={userText}
                          onInput={()=>processCurrentText()}
                          onChange={(e) => {
                              setUserText(e.target.value)}}
                          onClick={()=>startGame()}>
                </textarea>
                 <button className="restart_btn"
                        onClick={()=>resetGame()}>
                    Restart
                </button>
            </div>
                <div></div>
                <div></div>
                <div></div>
            </Box>
        </Fragment>
    )
}

export default TypingMaster;