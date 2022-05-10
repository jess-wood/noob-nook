import React from 'react';
import ReactDOM from 'react-dom';
import Game from './comps/Game.jsx';
import Header from './comps/Header.jsx';
import Footer from './comps/Footer.jsx';
import logo from './comps/img/logo.svg';
import './App.css';

const Pong = () => {
  const GatherStl = { paddingTop: "15px", textAlign: "center", marginRight: "20%", marginLeft: "20%", marginTop: "0%", backgroundColor: '#003366', opacity: "0.8" }
  return (
    <div style={{backgroundColor: '#003366', height: '93vh'}}>
      <div style={GatherStl} >
        <Header />
        <Game />
        <Footer />
      </div>
    </div>
  )
}

ReactDOM.render(<Pong />, document.getElementById("root"));
export default Pong;
