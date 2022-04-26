//credit to: https://github.com/kouteisang/snake-game
import Footer from "./Components/footer.jsx";
import Panel from "./Components/panel.jsx";
import './snake.css';
import {useEffect, useState} from "react";


import React, {Component, Fragment} from 'react'
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import API from "../../../../API_Interface/API_Interface";

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

export default class Snake extends Component {

    state = {
        score: 0,
        level:1,
    }


    changeScore = (score)=>{
        this.setState({score:score});
        if(score % 10 === 0){
            this.setState({level:score/10+1})
            const {panel} = this
            const {level} = this.state
            if(1000-level*200 > 0){
                panel.init(1000-level*200)
            }
        }
    }

    startGame = ()=>{
        document.body.style.backgroundColor = "#6190ab"
        const api = new API();
        async function makeNewPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, "is playing Snake!", dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewPost();
        const {panel} = this
        panel.init(1000)
    }

    render() {
        return (
            <Fragment>
                <Grid container position='fixed' className='back' direction='column' sx={{border: 0, backgroundColor:'#6190ab'}}>
                <Typography className='snake' justifySelf='center' sx={{fontWeight: 'bold', fontFamily: 'DotGothic16, sans-serif', fontSize: '40px'}}>S N A K E</Typography>
                <div className="App">
                    <Panel changeScore={this.changeScore} ref = {c=>this.panel = c} ></Panel>
                    <Footer ref={c=>this.footer = c} {...this.state} startGame={this.startGame} ></Footer>
                </div>
                </Grid>
            </Fragment>
        )
    }

}