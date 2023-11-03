import { makeStyles } from '@material-ui/core';
import React from 'react';
import HomeToScanBtn from './components/HomeToScanBtn';
import { ciStyle } from './styles';


const HomeToScanSection = () => {
  const classes = ciStyle();
  return (
    <div className={classes.leftSection}>
      <h1>Dolphin Defender shows you the security issues of your website and servers!</h1>
      <HomeToScanBtn />
    </div>
  )
}

const MarketingSection = () => {
  const classes = ciStyle();
  return (
    <div style={{padding: "10px"}}>
      <HomeToScanSection />
      <div className={classes.rightSection} style={{verticalAlign: "middle"}}>
        <img style={{width: "100%", margin: "auto"}} alt='results page example' src='results.jpg'/>
      </div>
      <div style={{clear: 'both'}}></div>
    </div>
  )
}
const FeaturesSection = () => {
  const classes = ciStyle();
  return (
    <div>
      <div className={classes.leftSection}>
        <h1>What can Dolphin Defender do for you?</h1>
        <ul>
          <li><h3>Read about each of the security issues</h3></li>
          <li><h3>See the distribution of issue severity</h3></li>
        </ul>
      </div>
      <div className={classes.rightSection}>
        <img src="resultsEx1.png" alt="" style={{width: "30%"}}></img>
        <img src="resultsEx2.png" alt="" style={{width: "70%"}}></img>
        <img src="resultsEx3.png" alt="" style={{width: "100%"}}></img>
      </div>
      <div style={{clear: 'both'}}></div>
    </div>
  )
}

function Home () {
  return (
    <div>
      <MarketingSection />
      <FeaturesSection />
    </div>
    );
}

export default Home;