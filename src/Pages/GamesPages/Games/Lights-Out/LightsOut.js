import {Component} from 'react'
import './utils/LO_App.css';
import Board_v2 from './Board_v2';
//import './utils/index.css' <- changes background across whole app

class LightsOut extends Component{
    render() {
        return (
            <div className='App'>
                <Board_v2 />
            </div>
        )
    }
}

export default LightsOut;