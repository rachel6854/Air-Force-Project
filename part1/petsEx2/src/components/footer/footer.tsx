import React, { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Footer: FC = () => {
    return (
        <AppBar position="fixed" color="primary" style={{top:'auto', bottom:0}}>
            <Toolbar>
                <img src='https://firebasestorage.googleapis.com/v0/b/ofek-leaders.appspot.com/o/ofekIcon.svg?alt=media' alt='icon' style={{ height: '25px', width: 'auto' }}></img>
                Powered by Ofek 324/Engineering Unit. Solved by by Rachel Weinstein.
                <img src='https://firebasestorage.googleapis.com/v0/b/ofek-leaders.appspot.com/o/ofekIcon.svg?alt=media' alt='icon' style={{ height: '25px', width: 'auto' }}></img>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;