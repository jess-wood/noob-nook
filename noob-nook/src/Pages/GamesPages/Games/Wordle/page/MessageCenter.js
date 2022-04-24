import React, {Fragment} from "react";
import {Typography} from "@mui/material";
import { alpha } from '@material-ui/core/styles/colorManipulator';

const MessageCenter = (props) => {
    const {msg} = props;
    return (
        <Fragment>
            <Typography variant='h5' align={'center'} sx={{fontFamily: ['Bangers', 'cursive'].join(','), fontWeight: 'bold', color: alpha(
                    '#997ff0', 0.9), fontSize: 25, fontStyle: 'oblique', mt: 2, mb: 2}} >
                {msg}
            </Typography>
        </Fragment>
    )
}

export default MessageCenter;