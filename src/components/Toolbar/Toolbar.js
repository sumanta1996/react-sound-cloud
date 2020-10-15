import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterData } from '../../store/musicData-actions';
import classes from './Toolbar.css';

const height1 = 70;
const height2 = 90;

const Toolbar = props => {
    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const containerStyle = {
        width: '100%',
        height: showSearch ? (height1 + height2) : height1,
        transition: 'height 0.4s ease-out'
    }

    const toolbarStyle = {
        boxShadow: '0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06)',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const searchStyle = {
        width: showSearch ? '100%' : '0px',
        height: showSearch ? '80px' : '0px',
        transition: 'height 0.4s ease-out',
        outline: 'none',
        margin: showSearch ? '': '-100px'
    }

    const textChangeHandler = event => {
        setText(event.target.value);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRef.current.value === text) {
                dispatch(filterData(text));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [text]);

    return (
        <div style={{ ...toolbarStyle, ...containerStyle }}>
            <header style={{width: '80%', height: '100%'}}>
                <div className={classes.Toolbar}>
                    <p className={classes.title}>Sound Cloud</p>
                    <img className={classes.play} src="https://simpleicon.com/wp-content/uploads/active-search.svg" onClick={() => setShowSearch(!showSearch)} />
                </div>
                <div style={searchStyle}>
                    <hr />
                    <input className={classes.input} ref={inputRef} placeholder="Search Tracks" value={text} onChange={textChangeHandler} />
                </div>
            </header>
        </div>
    )
}

export default Toolbar;