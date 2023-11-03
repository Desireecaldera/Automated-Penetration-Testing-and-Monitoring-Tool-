import React from 'react';
import {Link} from 'react-router-dom';
// import logo from '../logo.svg';

function NavBar() {
    return (
        <ul>
            <li><Button onClick={window.open("/home", '_self')}>Home</Button></li>
            <li><Button onClick={window.open("/scan", '_self')}>Scan</Button></li>
            <li><Button onClick={window.open("/results", '_self')}>Results</Button></li>
        </ul>
    );
}

export default NavBar
