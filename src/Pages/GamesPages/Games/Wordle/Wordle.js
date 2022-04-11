//Written by: Jessica Wood

import {Fragment, useState} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import {green, grey, orange} from '@mui/material/colors';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./utils/globalStyles";
import { lightTheme, darkTheme } from "./utils/themes";
//import './App.css';

import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopMessage from "./page/TopMessage";
import GameOver from "./page/GameOver";
import allWords from "./utils/fiveLetterWords.json";

import {
    numGuessAreaColumns} from "./utils/sizes";

import boxStyleVariants from "./utils/keyboardAndGuessAreaBoxTypes";
import Typography from "@mui/material/Typography";



const words = ["ABOUT","ABOVE","AFTER","ALONE","BEACH","BEGIN","BLACK","BRING","BROWN","CAMEL", "CANDY","CHILD","CLEAN",
    "CLOSE","COUNT","DREAM","DRIVE","EIGHT","FIGHT", "FOUND","GHOST","GREAT","HEARD","HEART","HORSE","HOUSE","INDIA",
    "JUICE", "LARGE","LIGHT","LUCKY","MONEY","MOUSE","MUSIC","NURSE","PANDA","PAPER","PARTY", "PLANE", "PLANT", "PLATE",
    "PRICE", "QUACK", "QUIET", "RIGHT", "RIVER", "ROBIN", "ROBOT", "ROUND", "SKUNK", "STAMP","STAND", "STICK", "STORE",
    "STORY", "STRAY", "TABLE", "THING", "TIGER", "TODAY", "TRAIN","TRUCK", "UNDER", "WATER", "WHITE", "WITCH", "WOMAN",
    "WOMEN", "WRITE", "ZEBRA"];

let numBoxesPerRow = 5;
let numRowsRemaining = 5; //6 rows total minus 1 for active row
const color = 'white';
//let msg = ""
let completedRows = [];
let rand = Math.floor(Math.random() * words.length);
let chosenWord = allWords[rand].toUpperCase();
let gameWon = false;
let gameOver = false;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const isNoMatch = (playerWord, chosenWord, index) => {
    //This will check to see if a letter should be mapped to noMatch
    let letterToCheck = playerWord[index];
    let numLetterInChosen = chosenWord.split(letterToCheck).length - 1;
    for (let i=0; i < playerWord.length; i++) {
        if (playerWord[i] !== letterToCheck){
            continue;
        }
        if (playerWord[i] === chosenWord[i]){
            numLetterInChosen--;
        }
    }
    return numLetterInChosen === 0;
}

const checkGameOver = (activeRow) => {
    for (let i=0; i < activeRow.length; i++){
        if (activeRow[i].letter === ''){
            return false;
        }
    }
    return true;
}

function Wordle() {
    //create keyboard
    const allKeys = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const initialKeyboard = () => {
        let keys = allKeys.split("").map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter}))
        const backspaceKey = {
            ...boxStyleVariants.keyboardUnusedKey,
            width: 50,
            letter: 'Delete',
            isBackspaceKey: true
        }
        const enterKey = {
            ...boxStyleVariants.keyboardUnusedKey,
            width: 50,
            letter: 'Enter',
            isEnterKey: true
        }
        keys.unshift(backspaceKey);
        keys.push(enterKey);
        return keys;
    }

    const checkWord = (activeRow, word) => { //once guess is made this will evaluate the word
        let countCorrectLetters = 0; //secondary check to call gameOver when all letters are correct
        let letters = []; //array to hold the players word

        //this loop is to build letters
        for (let i=0; i < activeRow.length; i++) {
            letters.push(activeRow[i].letter);
        }

        //this is the string of the players guess
        let playerWord = letters.join("");

        //this loop does the actual mapping of letters to their type of match
        for (let i=0; i < activeRow.length; i++) {

            //exact match condition
            if (activeRow[i].letter.toUpperCase() === word[i]){
                activeRow[i] = {...boxStyleVariants.exactMatch, letter: activeRow[i].letter};
                countCorrectLetters++;
            }

            //partialMatch condition
            else if (word.includes(activeRow[i].letter.toUpperCase())){

                //numLetter is the number of occurrences of the current letter
                let numLetter = word.split(activeRow[i].letter).length - 1;

                //split playerWord to length i because if it is not split
                // "JMMYM" will produce noMatch for all M's in string except the one in the 3rd pos of word
                let splicePlayerWord = playerWord.slice(0,i+1);
                let numPlayerLetter = splicePlayerWord.split(activeRow[i].letter).length - 1;

                //this handles the case of "JMMYM"
                if (numPlayerLetter > numLetter) {
                    activeRow[i] = {...boxStyleVariants.noMatch, letter: activeRow[i].letter};
                }
                else {
                    //Will have to do further checking to ensure I map to the right style
                    if(isNoMatch(playerWord, word, i)){
                        activeRow[i] = {...boxStyleVariants.noMatch, letter: activeRow[i].letter};
                    }
                    else {
                        activeRow[i] = {...boxStyleVariants.partialMatch, letter: activeRow[i].letter};
                    }
                }
            }
            //no match condition
            else {
                activeRow[i] = {...boxStyleVariants.noMatch, letter: activeRow[i].letter};
            }
        }
        if (allWords.includes(playerWord.toLowerCase())){
            setMSG("Guess Again!");
        }
        else{
            setMSG("Your word is not valid!")
        }
        if (countCorrectLetters === 5){
            //call game over function
            //msg = "You got it!";
            setMSG("You guessed the word!")
            gameWon = true;
            gameOver = true;
        }
        return activeRow;
    }

    //INITIAL DATA STRUCTURES
    const [activeRow, setActiveRow] = useState(new Array(numBoxesPerRow).fill({
        style: boxStyleVariants.blankBox,
        letter: ""
    }));
    const [activeRowIdx, setActiveRowIdx] = useState(0);
    const [keyboard, setKeyboard] = useState(initialKeyboard);
    const [msg, setMSG] = useState("Guess the secret word!");
    const remainingRows = new Array((numRowsRemaining) * numBoxesPerRow).fill({
        style: boxStyleVariants.blankBox
    });
    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

    //show word for testing
    console.log(chosenWord);

    //resets the game
    const resetGame = () => {
        //reset chosenWord, allBoxes, completedRows, remainingRows
        //reset activeRow
        const newActiveRow = activeRow.slice();
        for (let i=0; i < activeRow.length; i++){
            newActiveRow[i] = {
                style: boxStyleVariants.blankBox,
                letter: ''
            }
        }
        setActiveRow(newActiveRow);
        setActiveRowIdx(0); //set index back to 0 for next row
        //reset completedRows
        completedRows = [];
        //reset remainingRows
        numRowsRemaining = 5;
        //reset chosenWord
        rand = Math.floor(Math.random() * allWords.length);
        chosenWord = allWords[rand].toUpperCase();
    }

    //hande keyboard events
    const keyboardPressedCallback = (attrsOfKeyClicked) => {
        //this is to remove previous gameOver banner
        if (gameOver && numRowsRemaining === 5){
            setMSG(`Too Bad! The word was ${chosenWord}`);
            gameOver = false;
            gameWon = false;
        }
        if (activeRowIdx === 0 && attrsOfKeyClicked.isBackspaceKey) {
            //activeRow is empty and there is no letter to erase
            setMSG("No letter to delete");
            return;
        }
        if(attrsOfKeyClicked.isBackspaceKey){
            //evaluate backspace key
            const newActiveRow = activeRow.slice();
            newActiveRow[activeRowIdx-1] = boxStyleVariants.blankBox;
            setActiveRow(newActiveRow);
            setActiveRowIdx(activeRowIdx-1);
            return;
        }
        if(activeRowIdx === numGuessAreaColumns && attrsOfKeyClicked.isEnterKey){
            //evaluate the users work that is in active row.
            //check word and reset active row
            const activeRow1 = checkWord(activeRow, chosenWord);
            setActiveRow(activeRow1);
            numRowsRemaining -= 1; //help reflect changes in guessArea
            if(numRowsRemaining === -1){
                gameOver = true;
            }
            for (let i=0; i < activeRow.length; i++){
                completedRows.push(activeRow[i]);
            }
            //reset activeRow
            const newActiveRow = activeRow.slice();
            for (let i=0; i < activeRow.length; i++){
                newActiveRow[i] = {
                    style: boxStyleVariants.blankBox,
                    letter: ''
                }
                setActiveRow(newActiveRow);
            }
            setActiveRowIdx(0); //set index back to 0 for next row
            if (gameOver){
                //game over
                resetGame();
                return;
            }
            return;
        }
        if(attrsOfKeyClicked.isEnterKey){
            //ignore because word is not complete
            setMSG("Your word is not complete!");
            return;
        }
        if(activeRowIdx === numGuessAreaColumns){
            //ignore key since activeRow is filled
            setMSG("Press Enter to check your guess!");
            return;
        }

        const newActiveRow = activeRow.slice();
        newActiveRow[activeRowIdx] = {...boxStyleVariants.notEvaluated, letter: attrsOfKeyClicked.letter};
        setActiveRow(newActiveRow);
        setActiveRowIdx(activeRowIdx+1);
        setMSG("Keep going!");
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles/>
            <Fragment>
                <Box margin='auto' mt={5}
                     sx={{
                         height: 700,
                         width: 600,
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'center',
                         mb: 10,
                         mt: 6
                     }}
                >
                    <Box sx={{
                        mt: 1,
                        mb: 1
                    }}>
                        <TopMessage reset={resetGame}/></Box>
                    <Box sx={{
                        mb: 1
                    }}>
                        <GameOver gameOver={gameOver} gameWon={gameWon} /></Box>
                    <GuessArea allBoxes={allBoxes}/>
                    <MessageCenter msg={msg}/>
                    <Keyboard keyboard={keyboard} onClickCallback={keyboardPressedCallback} />
                </Box>
            </Fragment>
        </ThemeProvider>
    );
}

export default Wordle;