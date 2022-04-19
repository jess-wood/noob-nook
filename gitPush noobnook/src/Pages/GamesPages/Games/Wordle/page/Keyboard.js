import * as React from 'react';
import {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";

// **Connecting my keyboard? **

import {keyboardRowsHGap, keyboardBoxSizes} from "../utils/sizes";

const LetterBox = (props) => { //will construct keyboard

    const {keyAttributes} = props;
    return (
        <Box sx={{
            ...keyboardBoxSizes,
            border: 1,
            borderRadius: 1,
            ...keyAttributes,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography sx={{fontWeight: 'bold'}}>
            {keyAttributes.letter}
            </Typography>
        </Box>
    )
}


const Keyboard = (props) => {

    const {keyboard, onClickCallback} = props;

    const keyboardRow1 = keyboard.slice(0,11);
    const keyboardRow2 = keyboard.slice(11,20);
    const keyboardRow3 = keyboard.slice(20, keyboard.length);

    return (
        <Fragment>
            <Box sx={{marginRight: 5}}>
            <Grid container columns={11}
                  sx={{
                      width: (keyboard.length/3) * keyboardBoxSizes.width + (keyboard.length -1) * keyboardRowsHGap +200,
                      justifyContent: 'center',
                      alignItems: 'center',

                  }}
            >
                {
                    keyboardRow1.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <LetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>

            <Grid container columns={9}
                  sx={{
                      width: (keyboard.length/5) * keyboardBoxSizes.width + (keyboard.length -1) * keyboardRowsHGap +200,
                      marginLeft: 9.5,
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}
            >
                {
                    keyboardRow2.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <LetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>

            <Grid container columns={10}
                  sx={{
                      width: (keyboard.length/4) * keyboardBoxSizes.width + (keyboard.length -1) * keyboardRowsHGap +200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 5

                  }}
            >
                {
                    keyboardRow3.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <LetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
            </Box>
        </Fragment>
    )
}

export default Keyboard;

// <Grid container columns={9}
//       sx={{
//           width: (keyboard.length/4) * keyboardBoxSizes.width + (keyboard.length -1) * keyboardRowsHGap +200,
//           justifyContent: 'center',
//           alignItems: 'center',
//
//       }}
// >
//     {
//         keyboard.slice(11,19).map((keyAttributes, idx) =>
//             <Grid item
//                   key={idx}
//                   xs={1}
//                   sx={{mb: 1}}
//                   onClick={() => onClickCallback(keyAttributes)}
//             >
//                 <LetterBox keyAttributes={keyAttributes}/>
//             </Grid>
//         )
//     }
// </Grid>
// <Grid container columns={10}
//       sx={{
//           width: (keyboard.length/4) * keyboardBoxSizes.width + (keyboard.length -1) * keyboardRowsHGap +200,
//           justifyContent: 'center',
//           alignItems: 'center',
//
//       }}
// >
//     {
//         keyboard.slice(19,keyboard.length-1).map((keyAttributes, idx) =>
//             <Grid item
//                   key={idx}
//                   xs={1}
//                   sx={{mb: 1}}
//                   onClick={() => onClickCallback(keyAttributes)}
//             >
//                 <LetterBox keyAttributes={keyAttributes}/>
//             </Grid>
//         )
//     }
// </Grid>


// return (
//     <Fragment>
//         <Grid container>
//             {
//                 keyboard1.map((elementAttributes, idx) =>
//                     <Grid item
//                           key={idx}
//                           xs={1}
//                           sx={{mb: 1}}
//                           onClick={() => onClickCallback(elementAttributes)}
//                     >
//                         <LetterBox index={idx} value={elementAttributes}/>
//                     </Grid>
//                 )
//             }
//         </Grid>
//
//         <Grid container >
//             {
//                 keyboard2.map((elementAttributes, idx) =>
//                     <Grid item
//                           key={idx}
//                           xs={1}
//                           sx={{mb: 1}}
//                           onClick={() => onClickCallback(elementAttributes)}
//                     >
//                         <LetterBox index={idx} value={elementAttributes}/>
//                     </Grid>
//                 )
//             }
//         </Grid>
//         <Grid container >
//             {
//                 keyboard3.map((elementAttributes, idx) =>
//                     <Grid item
//                           key={idx}
//                           xs={1}
//                           sx={{mb: 1}}
//                           onClick={() => onClickCallback(elementAttributes)}
//                     >
//                         <LetterBox index={idx} value={elementAttributes}/>
//                     </Grid>
//                 )
//             }
//         </Grid>
//
//     </Fragment>
// )