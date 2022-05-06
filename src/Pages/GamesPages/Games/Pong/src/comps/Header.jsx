import React from 'react';
import logo2 from './img/p1.jpg';

class HeaderG extends React.Component {
  render() {
    const log2Stl = { maxWidth: "200px", marginBottom: 4 }
    return(
      <div>
        <img style={log2Stl} src={logo2} alt="Miss Pic"/>
        <h3 style={{color: 'white'}}></h3>
      </div>
    )
  }
}

export default HeaderG;
