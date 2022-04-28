
import React, {Fragment, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Grid from '@mui/material/Grid';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {gameComponents}  from './GameComponents';
import snakeLogo from './images/snake logo.png';
import logo2048 from './images/2048 logo.png';
import tetrisLogo from './images/tetris logo.png';
import wordlelogo from './images/wordle_banner.png';
import pongLogo from './images/pongpicture.png';
import lightoutLogo from './images/LightsOut_Logo_.webp';
import spaceInvaders from './images/space invaders.png';
import typeLogo from './images/TypeRacer_logo.svg.png';

const GameListItems = (props) => {
    return <div>

        {
            props.gameTitles.map(title =>
                <Grid button onClick={() => props.onClick(title)} key={title} sx={{color: 'black'}}>

                    <Box primary={title} key={title} sx={{color: 'black'}}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </Grid>
            )
        }
    </div>;
};
//


const findSelectedComponent = (selectedItem) => {
    const component = [...gameComponents()
        ].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    //console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
};


export default function MainBoard () {

    const [selectedItem, setSelectedItem] = useState('Summary');
    const handleSelectedItem = (title) => {
        setSelectedItem(title)
    };


    return (


            <Grid container rowSpacing={5} columnSpacing={1} sx={{marginLeft:1.5}}>
                <Grid item xs={3} sx={{}}>
                    <Box sx={{borderRadius: 2, border: 2, backgroundColor: 'gray' , height: 200 , width: 300,}}><img src={tetrisLogo} height={200} width={300}/></Box>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{borderRadius: 2, border: 2, backgroundColor: 'gray', height: 200 , width: 300}}><img src={wordlelogo} height={200} width={300}/></Box>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{borderRadius: 2, border: 2, backgroundColor: 'gray', height: 200 , width: 300}}><img src={lightoutLogo} height={200} width={300}/></Box>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{borderRadius: 2, border: 2, backgroundColor: 'gray' , height: 200 , width: 300}}><img src={spaceInvaders} height={200} width={300}/></Box>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{borderRadius: 2, border: 2, backgroundColor: 'gray' , height: 200 , width: 300}}><img src={snakeLogo} height={200} width={300}/></Box>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{borderRadius: 2, border: 2, backgroundColor: 'gray' , height: 200 , width: 300}}><img src={logo2048} height={200} width={300}/></Box>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{borderRadius: 2, border: 2, backgroundColor: 'gray' , height: 200 , width: 300}}><img src={typeLogo} height={200} width={300}/></Box>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{ borderRadius: 2, border: 2, backgroundColor: 'gray' , height: 200 , width: 300}}><img src={pongLogo} height={200} width={300}/></Box>
                </Grid>
            </Grid>


    );
}















//
//
// <GameListItems selectedItem={selectedItem}
//                onClick={handleSelectedItem}
//                gameTitles={gameComponents().map(comp => comp.title)}
// />
//
// {findSelectedComponent(selectedItem).component}
//
//
//
//


//
// import {gameComponents}  from './GameComponents';
// import Button from "@mui/material/Button";
// import {Grid} from "@mui/material";
// import {keyboardBoxSizes, keyboardRowsHGap} from "./Games/Wordle/utils/sizes";
//
// const drawerWidth = 240;
//
// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open }) => ({
//         flexGrow: 1,
//         padding: theme.spacing(3),
//         transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         marginLeft: `-${drawerWidth}px`,
//         ...(open && {
//             transition: theme.transitions.create('margin', {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//             marginLeft: 0,
//         }),
//     }),
// );

//
//
// const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
//     ({theme}) => ({
//
//         backgroundColor: 'purple',
//         height: 64,
//
//         transition: theme.transitions.create(['margin', 'width'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//     })
// );
// const DrawerHeader = styled('div')(({ theme }) => ({
//     // display: 'flex',
//     mb:10,
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
// }));
//
//
//
//
//
// function Cell(props) {
//
//     const {cell} = props;
//
//     return (
//         <Box sx={{
//             width: 50,
//             height: 50,
//             backgroundColor: cell['color'],
//             border: 1,
//             isOccupied: false,
//             borderColor: 'black',
//             borderRadius: '50%'}}
//         />
//     );
// }
//
//
//
// const TopBar = ({open, handleDrawerOpen}) => {
//     // This component is responsible for rendering the Toolbar that is drawn
//     // at the top of the drawer.
//
//     return (
//         <Fragment>
//             <AppBar >
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         sx={{ mr: 2, ...(open && { display: 'none' }) }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//
//                 </Toolbar>
//             </AppBar>
//         </Fragment>
//     )
// };

// const GameListItems = (props) => {
//     return <div>
//         {
//             props.gameTitles.map(title =>
//                 <ListItem button onClick={() => props.onClick(title)} key={title} sx={{color: 'purple'}}>
//                     <ListItemText primary={title} key={title} sx={{color: 'purple'}}/>
//                     {
//                         props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
//                     }
//                 </ListItem>
//             )
//         }
//     </div>;
// };
//
//
// const findSelectedComponent = (selectedItem) => {
//     const component = [...gameComponents()
//         ].filter(comp => comp.title === selectedItem);
//     if(component.length === 1)
//         return component[0];
//
//     console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
//     return {
//         title: null,
//         component: null
//     }
// };
//
// const MainDrawer = (props) => {
//     return(
//         <Fragment>
//
//
//
//
//         </Fragment>
//
//     )
//
// };
//
//
//
//
//
//
//
//
//     export default function MainDrawer() {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
//     const [selectedItem, setSelectedItem] = useState('Summary');
//
//     console.log('in MainDrawer');
//
//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };
//
//     const handleDrawerClose = () => {
//         setOpen(false);
//     };
//
//     const handleSelectedItem = (title) => {
//         setSelectedItem(title)
//     };
//
//     return (
//         <Fragment>
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                     },
//                 }}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//             >
//                 <DrawerHeader>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                     </IconButton>
//                 </DrawerHeader>
//                 <Divider />
//                 <List>
//                     <GameListItems selectedItem={selectedItem}
//                                            onClick={handleSelectedItem}
//                                            gameTitles={gameComponents().map(comp => comp.title)}
//                     />
//                 </List>
//                 <Divider />
//
//             </Drawer>
//             <Main open={open}>
//                 <DrawerHeader />
//                 {findSelectedComponent(selectedItem).component}
//             </Main>
//
//         </Box>
//
//
//         <Grid>
//
//
//
//         </Grid>
//
//
//
//         </Fragment>
//     );
// }
//     look into draught services on how to create boxes and grid
//
//     return (
//         <Box sx={{ display: 'flex' , backgroundColor: '#714C7A'}}>
//             <TopBar  handleDrawerOpen={handleDrawerOpen} />
//
//             <CssBaseline />
//
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                     },
//                 }}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//             >
//                 <DrawerHeader>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                     </IconButton>
//                 </DrawerHeader>
//                 <Divider />
//                 <List>
//                     <GameListItems selectedItem={selectedItem}
//                                            sx ={{color: 'gray'}}
//                                            onClick={handleSelectedItem}
//                                            gameTitles={gameComponents().map(comp => comp.title)}
//                     />
//                 </List>
//                 <Divider />
//
//             </Drawer>
//             <Main open={open}>
//                 <DrawerHeader />
//
//
//
//                 {findSelectedComponent(selectedItem).component}
//             </Main>
//         </Box>
//     );
// }
//
//
//
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import '../Login/Login.css';
// import Wordle from "./Games/Wordle/Wordle";
// import LightsOut from "./Games/Lights-Out/LightsOut";
// import Snake from "./Games/Snake/Snake";
// import Tetris from "./Games/Tetris/TetrisGame";
// import SpaceShooter from "./Games/SpaceGame/SpaceShooter";
// import TypingMaster from "./Games/TypingMaster/TypingMaster";
//
// const GameCatalog = (props) => {
//     //console.log("in games catalog");
//     return (
//         <Wordle/>
//     )
// }
//
// export default GameCatalog;
//
// //Testing games in here, change to whichever game you want to test
//
// //add highscores for tetris, lights out