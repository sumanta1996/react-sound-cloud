import React, { useEffect, useState } from 'react';
import classes from './Card.css';

const Card = props => {
    const [duration, setDuration] = useState();

    useEffect(() => {
        let audio = new Audio(props.songUrl);
        audio.addEventListener('loadedmetadata', event => {
            var minutes = parseInt(event.target.duration / 60, 10);
            if(minutes/10 < 1) {
                minutes = '0'+minutes.toString();
            }
            var seconds = parseInt(event.target.duration % 60);
            if(seconds/10 < 1) {
                seconds = '0'+seconds.toString();
            }
            setDuration(minutes + ':' + seconds);
        });
    }, []);

    return (
        <div className={classes.Card}>
            <img src={props.url} className={classes.image} />
            <p className={classes.author}>{props.author}</p>
            <p className={classes.songName}>{props.songName}</p>
            <div className={classes.actions}>
                {props.isItPlaying ?
                    <img src="https://simpleicon.com/wp-content/uploads/pause.png" className={classes.play} onClick={() => props.onClick(false)} /> :
                    <img src="https://simpleicon.com/wp-content/uploads/play1.svg" className={classes.play} onClick={() => props.onClick(true)} />}
                <p className={classes.duration}>{duration}</p>
            </div>
        </div>
    )
}

export default Card;