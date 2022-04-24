import Dashboard from "../Dashboard/Dashboard";
import Settings from '../Settings/Settings';
import UserProfile from "../UserProfile/UserProfile";
import GamesCatalog from "../GamesPages/GamesCatalog";
import EntryPage from "../Login/Login";
import TopBar from "./TopBar";
import MuiAppBar from '@mui/material/AppBar';



const presentationComponents = (props) => {
    return [
        {
            title: 'Home',
            component: <Dashboard/>
        },
        {
            title: 'Games',
            component: <GamesCatalog />
        },
        {
            title: 'Profile',
            component: <UserProfile/>
        },
        {
            title: 'Settings',
            component: <Settings/>
        },
        {
            title: 'Logout',
            component: <EntryPage/>
        }
    ];
};

export {presentationComponents};