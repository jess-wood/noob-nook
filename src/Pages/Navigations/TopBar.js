//Written by: Jess
import * as React from 'react';
import '../Login/Login.css';
import {Grid, } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import {Fragment, useEffect, useState} from "react";
import {presentationComponents} from "./MenuPresentationComponents";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import API from '../../API_Interface/API_Interface';
import UserProfile from "../UserProfile/UserProfile";

//shows the screen of the component clicked (default: login)
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 0,
        //mb: 15,
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({theme}) => ({
        backgroundColor: 'black',
        height: 64,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    })
);

const findSelectedComponent = (selectedItem, user) => {
    const component = [...presentationComponents()].filter(comp => comp.title === selectedItem);
    if(component.length === 1) {
        if (component[0].title === "Profile"){
            return {
                title: null,
                component: <UserProfile user={user} mainUser={user} isUserLoggedIn={true}/>
            }
        }
        return component[0];
    }

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
};

const otherUserProfile = (otherUser, mainUser) => {
    return <UserProfile user={otherUser} mainUser={mainUser} isUserLoggedIn={false}/>
};

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

//ask about top bar sizing, will create two rows on top bar as screen gets smaller
const TopBar = (props) => {
    const {logout, user} = props;
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState("Home");
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const menu1Items = presentationComponents().map(comp => comp.title).slice(0, 2);
    const menu2Items = presentationComponents().map(comp => comp.title).slice(2, 4);
    const [allUsers, setAllUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [otherUser, setOtherUser] = useState(undefined);
    console.log(otherUser);

    //get users for search bar
    useEffect(() => {
        console.log('in useEffect search');
        const api = new API();

        async function getUsers() {
            const usersJSONString = await api.allUsers();
            console.log(`routes from the DB ${JSON.stringify(usersJSONString)}`);
            setAllUsers(usersJSONString.data);
            console.log(JSON.stringify(allUsers));
        }

        getUsers();
    }, []);

    //sets the component to be displayed
    const handleSelectedItem = (title) => {
        console.log(`in handleSelected item ${title}`);
        setOtherUser(undefined);
        setSelectedItem(title);
    };

    //tests search bar, replace with array of all users
    function search() {
        setSuggestions([]);
        console.log(searchInput.length);
        if (searchInput.length >= 0) {
            allUsers.filter((user) => {
                let matches = [];
                if (user.username.toLowerCase().match(searchInput.toLowerCase()) !== null) {
                    console.log(user.username.toLowerCase().match(searchInput.toLowerCase()));
                    matches.push(user.username.toLowerCase().match(searchInput.toLowerCase()));
                    setSuggestions(matches);
                }
                console.log(JSON.stringify(suggestions));
                //return user.username.match(searchInput);
            });
        }
        // else{
        //     setSuggestions([]);
        // }
    }

    return (
        <Fragment>
            <AppBar position="fixed" sx={{width: '100%'}} >
                <Grid container columns={1} justifySelf={'center'} sx={{
                    columnGap: 0,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    columnSpan: 'auto',
                    width: '100%',
                    height: 64,
                }}>
                    <Grid container item key='left' columns={2} sx={{width: '35%', justifyContent: 'space-between'}}>
                {
                    menu1Items.map(title =>
                        <Grid item onClick={() => handleSelectedItem(title)} key={title} sx={{marginLeft: '4%', marginRight: '5%' }}>
                            <Button sx={{color:'white'}}><Typography sx={{fontFamily: 'Jura, Arial'}}>{title}</Typography></Button>
                        </Grid>
                    )
                }
                        <Grid item  key={'search'} sx={{marginLeft: '5%'}}>
                            <input
                                type="text"
                                placeholder="Search Users"
                                onChange={(e) =>{
                                    setSearchInput(e.target.value);
                                    search();
                                }}
                                value={searchInput} />
                            <ul>
                            {
                                suggestions.map(r => (
                                <Button onClick={(event) =>{ event.preventDefault(); setOtherUser(r.input); setSuggestions([]); setSearchInput('');}}><li key={r.input}>
                                <Typography sx={{color: 'white', fontSize: '10px'}}>{r.input}</Typography>
                                </li></Button>
                                ))
                            }
                                </ul>
                        </Grid>
                    </Grid>
                <Grid item key={"NookNook"} sx={{
                    alignItems: 'center', mt: 0.5}}>
                    <h8>NoobNook</h8>
                </Grid>
                    <Grid container item key='right' columns={2} sx={{width: '25%', justifyContent: 'space-between'}}>
                    {
                        menu2Items.map(title =>
                            <Grid item onClick={() => handleSelectedItem(title)} key={title} sx={{marginRight: '4%'}}>
                                <Button sx={{color:'white'}}><Typography sx={{fontFamily: 'Jura, Arial'}}>{title}</Typography></Button>
                            </Grid>
                        )
                    }
                    <Grid item key='logout' sx={{marginRight:'4%'}}><Button sx={{color: '#EB2D30'}} onClick={() => logout()}><LogoutIcon/></Button></Grid>
                    </Grid>
                </Grid>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
                {otherUser === undefined ? findSelectedComponent(selectedItem, user).component : otherUserProfile(otherUser, user)}
            </Main>
        </Fragment>
    )
}

export default TopBar;

//need to add functionality for logout
//need to add functionality for search