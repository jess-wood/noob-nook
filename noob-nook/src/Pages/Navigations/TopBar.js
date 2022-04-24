//Written by: Jess
import * as React from 'react';
import '../Login/Login.css';
import {Grid, } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import {Fragment, useState} from "react";
import {presentationComponents} from "./MenuPresentationComponents";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";


//search test array will replace with list of users
const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },
];

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

const findSelectedComponent = (selectedItem) => {
    const component = [...presentationComponents()].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
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
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState("Home");
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const menu1Items = presentationComponents().map(comp => comp.title).slice(0, 2);
    const menu2Items = presentationComponents().map(comp => comp.title).slice(2, 4);

    //sets the component to be displayed
    const handleSelectedItem = (title) => {
        console.log(`in handleSelected item ${title}`);
        setSelectedItem(title);
    };

    //tests search bar, replace with array of all users
    if (searchInput.length > 0) {
        countries.filter((country) => {
            console.log(country.name.toLowerCase().match(searchInput.toLowerCase()));
            return country.name.match(searchInput);
        });
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
                    height: 64
                }}>
                    <Grid container item key='left' columns={2} sx={{width: '35%', justifyContent: 'space-between'}}>
                {
                    menu1Items.map(title =>
                        <Grid item onClick={() => handleSelectedItem(title)} key={title} sx={{marginLeft: '4%', marginRight: '5%' }}>
                            <Button sx={{color:'white'}}><Typography sx={{fontFamily: 'Jura, Arial'}}>{title}</Typography></Button>
                        </Grid>
                    )
                }
                        <Grid item key={'search'} sx={{marginLeft: '5%'}}>
                            <input
                                type="text"
                                placeholder="Search Users"
                                onChange={(e) =>{
                                    setSearchInput(e.target.value);
                                }}
                                value={searchInput} />
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
                    <Grid item key='logout' sx={{marginRight:'4%'}}><Button sx={{color: '#EB2D30'}}><LogoutIcon/></Button></Grid>
                    </Grid>
                </Grid>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
                {findSelectedComponent(selectedItem).component}
            </Main>
        </Fragment>
    )
}

export default TopBar;

//need to add functionality for logout
//need to add functionality for search