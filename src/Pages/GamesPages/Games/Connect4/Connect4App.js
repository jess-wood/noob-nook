import Board from './Board'
import {Fragment} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

function Connect4App() {
  return (
      <Fragment>
          <Grid container columns={2}>
        <Grid item
             sx={{
               height: 600,
               width: 500,
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'flex-top',
               alignItems: 'center',
                 marginLeft: 60
             }}
        >
          <Board />
        </Grid>
              <Grid item>
              </Grid>
          </Grid>
      </Fragment>
  );
}

export default Connect4App;
