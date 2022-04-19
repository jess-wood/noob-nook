
import Wordle from  "../GamesPages/Games/Wordle/Wordle";
import Tetris from "../GamesPages/Games/Tetris/TetrisGame";
import LightsOut from "../GamesPages/Games/Lights-Out/LightsOut";
import SpaceGame from "../GamesPages/Games/SpaceGame/SpaceShooter";
import Snake from "../GamesPages/Games/Snake/Snake";
import App from "../GamesPages/Games/_2048/src/App";
const presentationComponents = (props) => {
    return [

        {
            title: 'Tetris',
            component: <Tetris/>
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
            component: <App />
        },
    ];
};


// const containerComponents = (props) => {
//     return [
//         {
//             title: 'Activities',
//             component: <Wordle />
//         }
//     ];
// };

export {presentationComponents};
