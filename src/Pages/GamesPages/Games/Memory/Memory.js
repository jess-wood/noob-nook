import { useEffect, useState, useRef } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    DialogTitle
} from "@material-ui/core";
import Card from "./card";
import "./app.scss";
import API from '../../../../API_Interface/API_Interface';


let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

const uniqueElementsArray = [
    {
        type: "Mario",
        image: require(`./images/mario.png`)
    },
    {
        type: "Bowser",
        image: require(`./images/bowser.png`)
    },
    {
        type: "Peach",
        image: require(`./images/peach.png`)
    },
    {
        type: "Mushroom",
        image: require(`./images/mushroom.png`)
    },
    {
        type: "Toad",
        image: require(`./images/toad.png`)
    },
    {
        type: "Boo",
        image: require(`./images/kindpng_1067112.png`)
    }
];

function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}
export default function Memory() {
    const [cards, setCards] = useState(
        shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
    );
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [bestScore, setBestScore] = useState(100);
    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };
    const enable = () => {
        setShouldDisableAllCards(false);
    };

    useEffect(() => {
        const api = new API();

        async function getUserHS() {
            const gameHSJSONString = await api.getMemoryHS( window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            console.log(`data=${gameHSJSONString.data[0]['HS_matching']}`);
            setBestScore(gameHSJSONString.data[0]['HS_matching']);

        }
        async function makeNewPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, "is playing Memory Scramble!", dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewPost();
        getUserHS();
    }, []);

    const makeNewHighScore = () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        const api = new API();

        async function makeNewScore() {
            const gameHSJSONString = await api.postNewHighScoreMemory(moves, window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        //update post here
        async function newHSPost() {
            const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `beat Memory Scramble in ${moves} moves and set a new high score!`, dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewScore();
        newHSPost();
    }

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
            //check high score
            const api = new API();
            async function deletePost() {
                const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Memory Scramble!");
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
            }
            deletePost();
            if (moves < bestScore || bestScore === 0){
                makeNewHighScore();
            }
            else{
                async function newGamePost() {
                    const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `beat Memory Scramble in ${moves} moves, but can do better :(`, dateTime);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                newGamePost();
            }
            setShowModal(true);
            const highScore = Math.min(moves, bestScore);
            setBestScore(highScore);
            //localStorage.setItem("bestScore", highScore);
        }
    };
    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].type === cards[second].type) {
            setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
            setOpenCards([]);
            return;
        }
        // This is to flip the cards back after 500ms duration
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };
    const handleCardClick = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            setMoves((moves) => moves + 1);
            disable();
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkCompletion();
    }, [clearedCards]);
    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };

    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    };

    const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setShouldDisableAllCards(false);
        // set a shuffled deck of cards
        setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
    };

    return (
        <div className="App">
            <header>
                <h9>Memory Scramble</h9>
                <div>
                    Select two cards with same content consequtively to make them vanish
                </div>
            </header>
            <div className="container">
                {cards.map((card, index) => {
                    return (
                        <Card
                            key={index}
                            card={card}
                            index={index}
                            isDisabled={shouldDisableAllCards}
                            isInactive={checkIsInactive(card)}
                            isFlipped={checkIsFlipped(index)}
                            onClick={handleCardClick}
                        />
                    );
                })}
            </div>
            <footer>
                <div className="score">
                    <div className="moves">
                        <span className="bold">Moves:</span> {moves}
                    </div>
                    {localStorage.getItem("bestScore") && (
                        <div className="high-score">
                            <span className="bold">Best Score:</span> {bestScore}
                        </div>
                    )}
                </div>
                <div className="restart">
                    <Button onClick={handleRestart} color="primary" variant="contained">
                        Restart
                    </Button>
                </div>
            </footer>
            <Dialog
                open={showModal}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Hurray!!! You completed the challenge
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You completed the game in {moves} moves. Your best score is{" "}
                        {bestScore} moves.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRestart} color="primary">
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}