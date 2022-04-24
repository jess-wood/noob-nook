import React, {Fragment, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import {presentationComponents}  from './GameComponents';
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {keyboardBoxSizes, keyboardRowsHGap} from "./Games/Wordle/utils/sizes";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);



// const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
//     ({theme}) => ({
//
//         backgroundColor: 'black',
//         height: 64,
//         transition: theme.transitions.create(['margin', 'width'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//     })
// );
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));





const gameBoxes = () =>{
    return(

        <Box sx={{

            border: 1,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography sx={{fontWeight: 'bold'}}>
                TEST BOX
            </Typography>
        </Box>
    )

}




const TopBar = ({open, handleDrawerOpen}) => {
    // This component is responsible for rendering the Toolbar that is drawn
    // at the top of the drawer.

    return (
        <Fragment>
            <Box>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </Box>
        </Fragment>
    )
};

const PresentationListItems = (props) => {
    return <div>
        {
            props.menuItemTitles.map(title =>
                <ListItem button onClick={() => props.onClick(title)} key={title} sx={{color: 'purple'}}>
                    <ListItemText primary={title} key={title} sx={{color: 'purple'}}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </ListItem>
            )
        }
    </div>;
};


const findSelectedComponent = (selectedItem) => {
    const component = [...presentationComponents()
        ].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
};





export default function MainDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState('Summary');

    console.log('in MainDrawer');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelectedItem = (title) => {
        setSelectedItem(title)
    };


    // look into draught services on how to create boxes and grid

    return (
        <Box sx={{ display: 'flex' , backgroundColor: '#714C7A'}}>
            <TopBar  handleDrawerOpen={handleDrawerOpen} />

            <CssBaseline />

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <PresentationListItems selectedItem={selectedItem}
                                           sx ={{color: 'gray'}}
                                           onClick={handleSelectedItem}
                                           menuItemTitles={presentationComponents().map(comp => comp.title)}
                    />
                </List>
                <Divider />

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{color: 'green'}}>Make GRID HERE </Box>


                {findSelectedComponent(selectedItem).component}
            </Main>
        </Box>
    );
}