
import React, {Fragment, useState, useEffect} from 'react';
import { styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {gameComponents}  from './GameComponents';
import snakeLogo from './images/snakepic.png';
import logo2048 from './images/2048-circle.png';
import tetrisLogo from './images/tetris logo.png';
import wordlelogo from './images/wordle_banner.png';
import pongLogo from './images/pongpic.png';
import lightoutLogo from './images/lights.png';
import spaceInvaders from './images/space invaders.png';
import typeLogo from './images/TypeRacer_logo.svg.png';
import logo_2048 from './images/2048test.png';
import conect4Logo from './images/connect4.png';
import memoryLogo from './images/memory.png';
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



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


const Catalog = (props) => {

    return (
        <Fragment>
            <Grid container sx={{backgroundColor: '#714C7A', width: '100%', height: '100%', border:5, mt: 0, marginLeft: 0}}>
                <Grid item sx={{height: '25%', width: '100%', border:0, borderColor:'red'}}>
                    <Box sx={{border:0, height: '100%', width: '100%'}}><Typography fontSize='40px' textDecoration='underline' sx={{textAlign:'center', mt: 1,color:'#FAE6FA', fontFamily: '\'Press Start 2P\', sans-serif', fontWeight:'bold'}}>GAMES</Typography></Box>
                </Grid>
                <Grid container  rowSpacing={5} columnSpacing={1} sx={{display: 'flex', flexDirection: 'row',marginLeft:0, backgroundColor: '#714C7A', height: '100%',width:'100%',mt: -1, padding: 5, paddingTop:0, justifyContent:'center', border: 0}}>
                    <Grid item justifyContent='center' xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{alignSelf: 'center', borderRadius: 2, border: 2, borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '69.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:0}} src={tetrisLogo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Tetris</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '70.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:0}} src={wordlelogo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Wordle</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '69.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:0}} src={lightoutLogo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Lights Out</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '72.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:0}} src={spaceInvaders} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Meteor Killers</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '70%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:0}} src={snakeLogo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Snake</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '86%' , width: '70%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:'0'}} src={logo2048} height={'70%'} width={'70%'}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>2048</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '72.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:2}} src={typeLogo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Typing Master</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0, alignItems:'center'}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{ borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '72.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:1}} src={pongLogo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Pong</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '69.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:0}} src={conect4Logo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Connect4</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={4} sx={{width: '30%', height: '25%',border: 0, alignItems:'center'}}>
                        <Button sx={{width: '100%', height: '100%', border: 0, flexDirection:'column'}}>
                            <Box sx={{ borderRadius: 2, border: 2,  borderColor: '#4fc3f7', backgroundColor: '#b3e5fc', height: '90%' , width: '72.2%',marginLeft:'0', mb:'4%'}}><img style={{marginLeft:4, marginTop: 3}} src={memoryLogo} height={200} width={300}/></Box>
                            <Typography sx={{textAlign:'center', mb: 2, color:'#FAE6FA', fontFamily: 'Jura, Arial', fontWeight:'bold', fontSize:'30px'}}>Memory Scramble</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}


const findSelectedComponent = (selectedItem) => {
    const component = [...gameComponents()
        ].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    //console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: 'Catalog',
        component: <Catalog/>
    }
};


export default function MainBoard (props) {
    const {title} = props;
    const [selectedItem, setSelectedItem] = useState(title);

    const handleSelectedItem = (title) => {
        setSelectedItem(title)
    };
    //to exit a game
    const handleGameExit = () => {
        setSelectedItem('Catalog');
    }


    return (
        <Fragment>
                {selectedItem !== 'Catalog' && <Button onClick={() => handleGameExit()} sx={{textAlign:'left', height: 1, width: '100%', borderRadius:0, backgroundColor:'black', mt:0,'&:hover': {
                        backgroundColor: 'black',
                    }}}><Typography sx={{fontFamily:'Jura, Arial', color: 'red', textAlign:'left'}}><ArrowBackIcon sx={{alignSelf:'left', color:'red'}}/></Typography></Button>}
            {selectedItem === 'Catalog' ?
                <Grid container
                      sx={{backgroundColor: '#714C7A', width: '100%', height: '100%', border: 5, mb: 5, marginLeft: 0, padding: 1}}>
                    <Grid item sx={{height: '25%', width: '100%', border: 0, borderColor: 'red', }}>
                        <Box sx={{border: 0, height: '100%', width: '100%'}}><Typography fontSize='40px'
                                                                                         textDecoration='underline'
                                                                                         sx={{
                                                                                             textAlign: 'center',
                                                                                             mt: 1,
                                                                                             color: '#FAE6FA',
                                                                                             fontFamily: '\'Press Start 2P\', sans-serif',
                                                                                             fontWeight: 'bold'
                                                                                         }}>GAMES</Typography></Box>
                    </Grid>
                    <Grid container rowSpacing={5} columnSpacing={1} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 0,
                        backgroundColor: '#714C7A',
                        height: '100%',
                        width: '100%',
                        mt: -1,
                        padding: 5,
                        paddingTop: 0,
                        justifyContent: 'center',
                        border: 0
                    }}>
                        <Grid item justifyContent='center' xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}}
                                    onClick={() => handleSelectedItem('Tetris')}>
                                <Box sx={{
                                    alignSelf: 'center',
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '69.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 0}} src={tetrisLogo} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Tetris</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Wordle')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '70.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 0}} src={wordlelogo} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Wordle</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Lights Out')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '69.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 0}} src={lightoutLogo} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Lights Out</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Space Game')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '72.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 0}} src={spaceInvaders} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Meteor Killers</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Snake')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '70%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 0}} src={snakeLogo} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Snake</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('2048')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '72%',
                                    width: '70%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: '0'}} src={logo2048} height={'70%'} width={'70%'}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>2048</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Typing Master')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '72.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 2}} src={typeLogo} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Typing Master</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0, alignItems: 'center'}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Pong')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '72.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 1}} src={pongLogo} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Pong</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Connect4')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '69.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 0}} src={conect4Logo} height={200} width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Connect4</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={4} sx={{width: '30%', height: '25%', border: 0, alignItems: 'center', mb: 4}}>
                            <Button sx={{width: '100%', height: '100%', border: 0, flexDirection: 'column'}} onClick={() => handleSelectedItem('Memory')}>
                                <Box sx={{
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#4fc3f7',
                                    backgroundColor: '#b3e5fc',
                                    height: '90%',
                                    width: '72.2%',
                                    marginLeft: '0',
                                    mb: '4%'
                                }}><img style={{marginLeft: 4, marginTop: 3}} src={memoryLogo} height={200}
                                        width={300}/></Box>
                                <Typography sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: '#FAE6FA',
                                    fontFamily: 'Jura, Arial',
                                    fontWeight: 'bold',
                                    fontSize: '30px'
                                }}>Memory Scramble</Typography>
                            </Button>
                        </Grid>
                        <Box sx={{height: 80}}></Box>
                    </Grid>
                </Grid>
            : findSelectedComponent(selectedItem).component}
        </Fragment>

    );
}