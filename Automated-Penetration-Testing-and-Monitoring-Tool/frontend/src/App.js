import React from 'react';
import './App.css';
import Home from './Home';
import Scan from './Scan';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
// import NavBar from './components/NavBar';
import Resultstest from './Resultstest';
import NavHeader from './components/NavHeader';
import Login from './Login';

function App() {  
  return ( 
    <div className="App">
    <Router>
      <NavHeader />
      <Switch>
        <Route path ='/' exact component = {Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/home' exact component={Home} />
        <Route path='/scan' component={Scan} />
        <Route path='/resultstest' component={Resultstest}/>
      </Switch>
    </Router>
    
      {/*
      <NavBar />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Scan" component={Scan} />
      <Route exact path="/Results" component={Results} />
      <Route exact path="/Resultstest" component={Resultstest}/> */}
    
    </div>
  );
}

export default App;
