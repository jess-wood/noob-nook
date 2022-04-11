import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Fragment} from "react";
import Grid from "@mui/material/Grid";
import {green, grey, orange} from '@mui/material/colors';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import {theme} from "../utils/themes";
import { ThemeProvider } from '@material-ui/core/styles';

import { guessBoxSizes
} from "../utils/sizes";
import boxStyleVariants from "../utils/keyboardAndGuessAreaBoxTypes";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: grey[50],
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TopMessage = (props) => {

    const {reset} = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <ThemeProvider theme={theme}>
        <Fragment>
            <Grid container spacing={1} sx={{marginLeft: 6}} >
                <Grid item xs={4}>
                    <Button
                        style={{
                            borderColor: 'white',
                            color: 'white'
                        }}
                        variant="outlined" onClick={handleOpen}>Instructions</Button>
                        <Modal open={open}
                               onClose={handleClose}
                               aria-labelledby="modal-modal-title"
                               aria-describedby={"modal-modal-description"}
                               >
                            <Box sx={style}>
                                <Typography id={"modal-modal-title"} variant={"h6"} component={"h2"} sx={{color: 'black', fontWeight: 'bold'}}>
                                    HOW TO PLAY
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, color: 'black'}}>
                                    Guess the <strong>WORDLE</strong> in six tries.<br/>
                                    <br/>
                                    Each guess must be a valid five-letter word. Hit the enter button to submit.<br/>
                                    <br/>
                                    After each guess, the color of the tiles will change to show how close your guess was to the word. <br/>
                                    <br/>
                                    <strong>Example</strong> <br/>
                                    <br/>
                                    <strong>A</strong> is in the correct spot. <strong>B</strong> is in the word and in the wrong spot. <strong>C</strong> is not in the word.
                                    <Grid container columns={3}>
                                        <Grid item >
                                            <Box sx={{
                                                ...guessBoxSizes,
                                                border: 1,
                                                ...boxStyleVariants.exactMatch,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mt: 1,
                                                mb: 1,
                                                marginLeft: 7,
                                                marginRight: 11
                                            }} >
                                                <Typography variant='h4' sx={{ fontWeight: 'bold', color: boxStyleVariants.exactMatch.color}}>
                                                A
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item >
                                            <Box sx={{
                                                ...guessBoxSizes,
                                                border: 1,
                                                ...boxStyleVariants.partialMatch,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mt: 1,
                                                mb: 1,
                                                marginLeft: 10,
                                                marginRight: 9
                                            }} >
                                                <Typography variant='h4' sx={{ fontWeight: 'bold', color: boxStyleVariants.partialMatch.color}}>
                                                    B
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item >
                                            <Box sx={{
                                                ...guessBoxSizes,
                                                border: 1,
                                                ...boxStyleVariants.noMatch,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mt: 1,
                                                mb: 1,
                                                marginLeft: 15,
                                                marginRight: 3
                                            }} >
                                                <Typography variant='h4' sx={{ fontWeight: 'bold', color: boxStyleVariants.noMatch.color}}>
                                                    C
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    Press the Reset button to start over!
                                </Typography>
                            </Box>
                        </Modal>

                </Grid>
                <Grid item xs={4}>

                    <Typography variant='h5' sx={{fontFamily: ['Bangers', 'cursive'].join(','), fontWeight: 'bold', color: green[400], fontSize: 34}}>
                        W o r d l e
                    </Typography>

                </Grid>
                <Grid item xs={4}>
                     <Button style={{
                         borderColor: alpha("#ff4c2e", 0.6),
                         color: alpha("#ff4c2e", 0.6)
                     }}
                             variant="outlined"
                             onClick={reset}>Reset</Button>
                </Grid>
            </Grid>

        </Fragment>
        </ThemeProvider>
    );
}

export default TopMessage;