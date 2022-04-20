import ReactDOM from "react-dom";
import './Login.css';
import React, {Component, Fragment, useState, useEffect} from 'react';
import {theme} from '../../utils/themes'
import { ThemeProvider } from '@material-ui/core/styles';
import Dashboard from "../Dashboard/Dashboard";
import {Link} from "@mui/material";
import TopBar from "../Navigations/TopBar";
import GamesCatalog from "../GamesPages/GamesCatalog";
import UserProfile from "../UserProfile/UserProfile";
import Settings from "../Settings/Settings";
import Box from "@mui/material/Box";

import API from '../../API_Interface/API_Interface';

const EntryPage = (props) => {
    const {user, setUser} = props;
    const [userInput, setUserInput] = useState('');
    const [userPW, setUserPW] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [currentpage, setCurrentView] = useState("logIn");
    console.log("in entry page");
    useEffect(() => {
        console.log(` in user verify effect ${verifyUser}`);
    if( ! verifyUser || userInput.length === 0)
        return;

    const api = new API();
    async function getUserInfo() {
        console.log("in user verify effect");
        api.getUserInfo(userInput, userPW)
            .then( userInfo => {
                console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                const user = userInfo.user;
                if( userInfo.status === "OK" ) {
                    setUser(user);
                } else  {
                    setVerifyUser(false);
                    setAuthFailed(true);
                }
            });
    }

    getUserInfo();
}, [verifyUser, setUser, userInput]);

    const changeView = (view) => {
        setCurrentView(view);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const input = this.refs.username;
        this.props.login(input.value);
        input.value = '';
    }

    const handleInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handlePWChange = event => {
        setUserPW(event.target.value);
        setAuthFailed(false);

        if (event.key === "Enter"){
            console.log("HandleKeyPress: Verify user input");
            setVerifyUser(true);
        }
    }

    const currentView = () => {
        switch(currentpage) {
            case "signUp":
                return (
                    <ThemeProvider theme={theme}>
                        <Fragment>
                            <h7>NoobNook</h7>
                            <form>
                            <h2>Sign Up!</h2>
                                     <fieldset>
                                         <legend>Create Account</legend>
                                         <ul>
                                             <li>
                                                 <label >Username:</label>
                                                 <input type="text" id="username" required/>
                                             </li>
                                             <li>
                                                 <label >Email:</label>
                                                 <input type="email" id="email" required/>
                                             </li>
                                             <li>
                                                 <label >Password:</label>
                                                 <input type="password" id="password" required/>
                                             </li>
                                         </ul>
                                     </fieldset>

                                     <button className={'b1'}>Submit</button>
                                     <button type="button" onClick={() => setCurrentView('logIn')}>Have an Account?</button>
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
                                        <label >Username:</label>
                                        <input value={userInput} onChange={handleInputChange} type="text" id="username" required/>
                                    </li>
                                    <li>
                                        <label >Password:</label>
                                        <input value={userPW} onChange={handlePWChange} type="password" id="password" required/>
                                    </li>
                                    <li>
                                        <i/>
                                        <a onClick={ () => setCurrentView("PWReset") } href="#">Forgot Password?</a>
                                    </li>
                                </ul>
                            </fieldset>
                            <button className={'b1'} onClick={(event) => {
                                event.preventDefault();
                                console.log('about to set verify user to true.');
                                setVerifyUser(true)
                            }}>Login</button>
                            <button type="button" onClick={ () => setCurrentView("signUp")}>Create an Account</button>
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
                                    <label >Email:</label>
                                    <input type="email" id="email" required/>
                                </li>
                            </ul>
                        </fieldset>
                        <button>Send Reset Link</button>
                        <button type="button" onClick={ () => setCurrentView("logIn")}>Go Back</button>
                    </form>
                    </Fragment>
                )
            default:
                break
        }
    }

    useEffect(() => {
        console.log(`effect for login view: ${currentpage}`);
        currentView();

    }, [currentpage]);


    return (
        <section id="entry-page">
            {currentView()}
        </section>
    )
}

// ReactDOM.render(<EntryPage/>, document.getElementById("app"))

export default EntryPage;

// <Typography variant='h7' sx={{fontFamily: "Press Start 2P", fontWeight: 'bold', color: 'black', fontSize: 34}}>
//     NoobNook</Typography>


// class EntryPage extends Component {
//     const [userInput, setUserInput] = useState('');
//     const [verifyUser, setVerifyUser] = useState(false);
//     const [authFailed, setAuthFailed] = useState(false);
//     const [currentView1, setCurrentView] = useState("signUp");
//
//
//
//     constructor(props){
//         super(props)
//         this.state = {
//             currentView: "signUp"
//         }
//     }
//
//     useEffect(() => {
//
//     if( ! verifyUser || userInput.length === 0)
//     return;
//
//     const api = new API();
//     async function getUserInfo() {
//         api.getUserInfo(userInput)
//             .then( userInfo => {
//                 console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
//                 const user = userInfo.user;
//                 if( userInfo.status === "OK" ) {
//                     setUser(user);
//                 } else  {
//                     setVerifyUser(false);
//                     setAuthFailed(true);
//                 }
//             });
//     }
//
//     getUserInfo();
// }, [verifyUser, setUser, userInput]);
//
// changeView = (view) => {
//     this.setState({
//         currentView: view
//     })
// }
//
// handleSubmit = (event) => {
//     event.preventDefault();
//     const input = this.refs.username;
//     this.props.login(input.value);
//     input.value = '';
// }
//
// currentView = () => {
//     switch(this.state.currentView) {
//         case "signUp":
//             return (
//                 <ThemeProvider theme={theme}>
//                     <Fragment>
//                         <h7>NoobNook</h7>
//                         <form>
//                             <h2>Sign Up!</h2>
//                             <fieldset>
//                                 <legend>Create Account</legend>
//                                 <ul>
//                                     <li>
//                                         <label htmlFor="username">Username:</label>
//                                         <input type="text" id="username" required/>
//                                     </li>
//                                     <li>
//                                         <label htmlFor="email">Email:</label>
//                                         <input type="email" id="email" required/>
//                                     </li>
//                                     <li>
//                                         <label htmlFor="password">Password:</label>
//                                         <input type="password" id="password" required/>
//                                     </li>
//                                 </ul>
//                             </fieldset>
//
//                             <button className={'b1'}>Submit</button>
//                             <button type="button" onClick={() => this.changeView("logIn")}>Have an Account?</button>
//                         </form>
//                     </Fragment>
//                 </ThemeProvider>
//             )
//             break;
//         case "logIn":
//             return (
//                 <Fragment>
//                     <h7>NoobNook</h7>
//                     <form>
//                         <h2>Welcome Back!</h2>
//                         <fieldset>
//                             <legend>Log In</legend>
//                             <ul>
//                                 <li>
//                                     <label for="username">Username:</label>
//                                     <input type="text" id="username" required/>
//                                 </li>
//                                 <li>
//                                     <label for="password">Password:</label>
//                                     <input type="password" id="password" required/>
//                                 </li>
//                                 <li>
//                                     <i/>
//                                     <a onClick={ () => this.changeView("PWReset")} href="#">Forgot Password?</a>
//                                 </li>
//                             </ul>
//                         </fieldset>
//                         <button className={'b1'}>Login</button>
//                         <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
//                     </form>
//                 </Fragment>
//             )
//             break
//         case "PWReset":
//             return (
//                 <Fragment>
//                     <h7>NoobNook</h7>
//                     <form>
//                         <h2>Reset Password</h2>
//                         <fieldset>
//                             <legend>Password Reset</legend>
//                             <ul>
//                                 <li>
//                                     <em>A reset link will be sent to your inbox!</em>
//                                 </li>
//                                 <li>
//                                     <label for="email">Email:</label>
//                                     <input type="email" id="email" required/>
//                                 </li>
//                             </ul>
//                         </fieldset>
//                         <button>Send Reset Link</button>
//                         <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
//                     </form>
//                 </Fragment>
//             )
//         default:
//             break
//     }
// }
//
//
// render() {
//     return (
//         <section id="entry-page">
//             {this.currentView()}
//         </section>
//     )
// }
// }