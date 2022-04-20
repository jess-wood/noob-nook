import PressStart2PRegular from './Fonts/PressStart2P-Regular.ttf';
import { createMuiTheme } from '@material-ui/core/styles';
import {createTheme} from "@mui/system";

export const pressStart2PRegular = {
    fontFamily: 'PressStart2PRegular',
    fontStyle: 'regular',
    fontWeight: '600',
    src: `
    local('PressStart2P'),
    local('PressStart2P-Regular),
    url(${PressStart2PRegular}) format('ttf')
    `,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,' +
        ' U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',

}

export const theme = createMuiTheme({
    typography: {
        fontFamily: ['PressStart2P', 'cursive'].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [pressStart2PRegular],
            },
        }
    }
})