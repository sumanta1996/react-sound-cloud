import React from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import classes from './Layout.css';

const Layout = props => {
    return (
        <div>
            <Toolbar />
            <div className={classes.bodyTitle}>
                <p>Spotlight/</p>
                <p className={classes.heading}>Featured Tracks</p>
            </div>
            {props.children}
        </div>
    )
}

export default Layout;