import {green, grey, orange} from '@mui/material/colors';

const boxStyleVariants = {
    exactMatch: {
        backgroundColor: green[400],
        color: grey[50],
        borderColor: '#0fbf35'
    },

    partialMatch: {
        backgroundColor: '#ffb74d',
        color: grey[50],
        borderColor: '#ffd54f'

    },

    noMatch: {
        backgroundColor: grey[500],
        color: grey[50],
        borderColor: grey[500]
    },

    blankBox: {
        backgroundColor: '#6b8096',
        color: grey[50],
        borderColor: '#6b8096'
    },

    notEvaluated: {
        backgroundColor: '#6b8096',
        color: grey[50],
        borderColor: '#6b8096'
    },

    keyboardUnusedKey: {
        backgroundColor: '#212121',
        color: 'white',
        borderColor: grey['A100']
    }
};

export default boxStyleVariants;