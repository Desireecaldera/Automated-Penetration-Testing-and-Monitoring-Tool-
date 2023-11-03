import React from 'react';
import { Button, makeStyles, Link } from '@material-ui/core';
import { ciStyle } from '../styles';

function HomeToScanBtn() {
    const classes = ciStyle();
    return (
        <div>
            <h1 className={classes.promoText}>Try out a scan today: </h1>
            <Button href='/scan' className={classes.button} variant="contained" disableElevation>SCAN</Button>
        </div>
    );
}

export default HomeToScanBtn
