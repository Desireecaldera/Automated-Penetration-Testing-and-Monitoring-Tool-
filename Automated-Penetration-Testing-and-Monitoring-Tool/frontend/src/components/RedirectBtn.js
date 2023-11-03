import React from 'react';
import { useHistory } from "react-router-dom";
//import {Button} from 'react-bootstrap';
import {Button} from '@material-ui/core';


function RedirectBtn(){
 
    const history = useHistory();

    const handleRoute = () =>{
        
        history.push("/Resultstest")
    }

    return(
        <Button onClick={handleRoute}> Scan </Button>
    );

}
export default RedirectBtn;