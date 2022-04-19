import { createMuiTheme } from '@material-ui/core/styles';
import {createTheme} from "@mui/system";
import BangersRegular from './Fonts/Bangers-Regular.ttf';


const bangersRegular = {
    fontFamily: 'BangersRegular',
    fontStyle: 'regular',
    //fontDisplay: 'swap',
    fontWeight: '600',
    src: `
   local('Bangers'),
   local('Bangers-Regular'),
   url(${BangersRegular}) format('ttf')
 `,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};


export const theme = createMuiTheme({
    typography: {
        fontFamily: ['Bangers', 'cursive'].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [bangersRegular],
            },
        }
    }
})

export const darkTheme = {
    typography: {
        fontFamily: ['Bangers', 'cursive'].join(','),
    },
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
}
