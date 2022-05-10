
import Wordle from  "../GamesPages/Games/Wordle/Wordle";
import Tetris from "../GamesPages/Games/Tetris/TetrisGame";
import LightsOut from "../GamesPages/Games/Lights-Out/LightsOut";
import SpaceGame from "../GamesPages/Games/SpaceGame/SpaceShooter";
import Snake from "../GamesPages/Games/Snake/Snake";
import Game_2048 from "../GamesPages/Games/_2048/src/components/mainBoard";
import TypingMaster from "../GamesPages/Games/TypingMaster/TypingMaster";
import Memory from "./Games/Memory/Memory";
import Pong from "./Games/Pong/src";
import Connect4App from "./Games/Connect4/Connect4App"


const gameComponents = (props) => {
    return [

        {
            title: 'Tetris',
            component: <Tetris/>,

        },

        {
            title: 'Wordle',
            component: <Wordle />
        },
        {
            title: 'Lights Out',
            component: <LightsOut />
        },
        {
            title: 'Space Game',
            component: <SpaceGame />
        },
        {
            title: 'Snake',
            component: <Snake />
        },

        {
            title: '2048',
            component: <Game_2048 />
        },
        {
            title:'Typing Master',
            component: <TypingMaster/>
        },
        {
            title:'Connect4',
            component: <Connect4App/>
        },
        {
            title:'Pong',
            component: <Pong/>
        },
        {
            title:'Memory',
            component: <Memory/>
        }
    ];
};


export {gameComponents};
