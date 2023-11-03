import React from 'react';
import RedirectBtn from './components/RedirectBtn';

function Scan () {
    function validateURL() {
        //var submitbtn = document.getElementById("submitbtn");
        var inputURL = document.getElementById("fname").value;
        localStorage.setItem('input', inputURL);
        try {
            var url = new URL(inputURL);
            var errbox = document.getElementById("errbox");
            errbox.innerHTML = "<p>Good URL</p>";
            return true; //here
            //submitbtn.classList.remove("noSubmit");
        }
        catch {
            var errbox = document.getElementById("errbox");
            errbox.innerHTML = "<p>Bad URL!</p>";
            return false; //here
            //submitbtn.classList.add("noSubmit");
        }
    }
    return (
        <div>
            <h1>Scan your URL here!</h1>
            <div><input type="text" id="fname" onKeyUp={validateURL} placeholder="Website URL, eg:'http://wwww.google.com'" size="50"></input></div>
            {/*<div><input type="text" id="fname" placeholder="Website URL, eg:'http://wwww.google.com'" size="35"></input></div>*/}
            <div id="errbox"></div>
            <RedirectBtn />
        </div>
    );
}

export default Scan;