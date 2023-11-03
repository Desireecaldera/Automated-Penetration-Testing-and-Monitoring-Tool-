import React from 'react';
import './components/myClasses.css';
import LoginToHomeBtn from './components/LoginToHomeBtn';

function Login() {
    return (
        <div className="login-page"> 
            <h1> Login </h1> 
            <p> Enter your CI email </p>
            <input type = "text" placeholder="john.doe123@myci.csuci.edu" size="50"/>
            <br></br>
            <p> Enter your password </p> 
            <input type = "text" size="50" />
            <br></br>
            <p>
                <LoginToHomeBtn />
            </p>
            
        </div>

    );
}

export default Login;