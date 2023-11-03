import React from 'react';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

function LoginToHomeBtn(){
    return(
        <button><Link to="/home">Go To Home Page</Link></button>
    );

}
export default LoginToHomeBtn;