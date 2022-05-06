import React from 'react';

class Footer extends React.Component {
  render() {
    const cont1 = { padding: "20px 20% 10px 20%" }
    return(
      <div >
          <p style={{color: 'white', marginTop: 2, marginBottom:1}}>Click to begin the game. Use your mouse as your paddle board (left side).</p>
    </div>
    )
  }
}

export default Footer;
