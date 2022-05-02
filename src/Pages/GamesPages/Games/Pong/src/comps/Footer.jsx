import React from 'react';

class Footer extends React.Component {
  render() {
    const cont1 = { padding: "20px 20% 10px 20%" }
    return(
      <div style={cont1}>
          <p>Click to begin the game. Use your mouse as your paddle board (left side).</p>
          <p>Credit goes to: Edxael - Edmundo Rubio</p>
          <p>Link to source: https://github.com/Edxael/React-Pong</p>
    </div>
    )
  }
}

export default Footer;
