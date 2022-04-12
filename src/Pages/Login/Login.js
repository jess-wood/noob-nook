import ReactDOM from "react-dom";
import './Login.css';
import React, {Component, Fragment} from 'react';
import {theme} from '../../utils/themes'
import { ThemeProvider } from '@material-ui/core/styles';
//import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import {Link} from "@mui/material";
import TopBar from "../Navigations/TopBar";
import GamesCatalog from "../GamesPages/GamesCatalog";
import UserProfile from "../UserProfile/UserProfile";
import Settings from "../Settings/Settings";
import Box from "@mui/material/Box";
//import { useHistory } from 'react-router-dom';

class EntryPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentView: "signUp"
        }
    }

    changeView = (view) => {
        this.setState({
            currentView: view
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const input = this.refs.username;
        this.props.login(input.value);
        input.value = '';
    }

    currentView = () => {
        switch(this.state.currentView) {
            case "signUp":
                return (
                    <ThemeProvider theme={theme}>
                        <Fragment>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                {/*<BrowserRouter>*/}
                                {/*<TopBar />*/}
                                {/*<Routes>*/}
                                {/*    <Route path='/games' element={<GamesCatalog/>} />*/}
                                {/*    <Route path='/dashboard' element={<Dashboard/>} />*/}
                                {/*    <Route path='/profile' element={<UserProfile/>} />*/}
                                {/*    <Route path='/settings' element={<Settings/>} />*/}
                                {/*</Routes>*/}
                                {/*</BrowserRouter>*/}
                            </Box>
                            <h7>NoobNook</h7>
                            <form>
                            <h2>Sign Up!</h2>
                                     <fieldset>
                                         <legend>Create Account</legend>
                                         <ul>
                                             <li>
                                                 <label htmlFor="username">Username:</label>
                                                 <input type="text" id="username" required/>
                                             </li>
                                             <li>
                                                 <label htmlFor="email">Email:</label>
                                                 <input type="email" id="email" required/>
                                             </li>
                                             <li>
                                                 <label htmlFor="password">Password:</label>
                                                 <input type="password" id="password" required/>
                                             </li>
                                         </ul>
                                     </fieldset>

                                     <button className={'b1'}>Submit</button>
                                     <button type="button" onClick={() => this.changeView("logIn")}>Have an Account?</button>
                                 </form>
                        </Fragment>
                    </ThemeProvider>
                )
                break;
            case "logIn":
                return (
                    <Fragment>
                        <h7>NoobNook</h7>
                        <form>
                            <h2>Welcome Back!</h2>
                            <fieldset>
                                <legend>Log In</legend>
                                <ul>
                                    <li>
                                        <label for="username">Username:</label>
                                        <input type="text" id="username" required/>
                                    </li>
                                    <li>
                                        <label for="password">Password:</label>
                                        <input type="password" id="password" required/>
                                    </li>
                                    <li>
                                        <i/>
                                        <a onClick={ () => this.changeView("PWReset")} href="#">Forgot Password?</a>
                                    </li>
                                </ul>
                            </fieldset>
                            <button className={'b1'}>Login</button>
                            <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
                        </form>
                    </Fragment>
                )
                break
            case "PWReset":
                return (
                    <Fragment>
                        <h7>NoobNook</h7>
                    <form>
                        <h2>Reset Password</h2>
                        <fieldset>
                            <legend>Password Reset</legend>
                            <ul>
                                <li>
                                    <em>A reset link will be sent to your inbox!</em>
                                </li>
                                <li>
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" required/>
                                </li>
                            </ul>
                        </fieldset>
                        <button>Send Reset Link</button>
                        <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
                    </form>
                    </Fragment>
                )
            default:
                break
        }
    }


    render() {
        return (
            <section id="entry-page">
                {this.currentView()}
            </section>
        )
    }
}

// ReactDOM.render(<EntryPage/>, document.getElementById("app"))

export default EntryPage;

// <Typography variant='h7' sx={{fontFamily: "Press Start 2P", fontWeight: 'bold', color: 'black', fontSize: 34}}>
//     NoobNook</Typography>