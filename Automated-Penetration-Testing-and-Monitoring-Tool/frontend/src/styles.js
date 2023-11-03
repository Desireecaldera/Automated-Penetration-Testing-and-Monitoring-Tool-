import {makeStyles} from '@material-ui/core';

export const ciStyle = makeStyles({
    promoText: {
        fontSize: '24px',
        fontStyle: 'oblique',
    },
    button: {
        background: '#dc143c',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        width: 84,
        padding: '0 30px',
        fontSize: '18px',
        "&:hover": {
            color: "white",
        },
    },
    leftSection: {
        float: "left",
        width: "50%",
        padding: "12px",
    },
    rightSection: {
        float: "right",
        width: "50%",
        padding: "12px",
    },
});
