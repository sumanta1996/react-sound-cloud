import React, { useCallback, useEffect, useState } from 'react';
import { musicData } from '../../data/data';
import classes from './PlayerAction.css';

let audio;

const PlayerAction = props => {
    const [duration, setDuration] = useState();
    const [partPlayed, setPartPlayed] = useState();
    const [rawDuration, setRawDuration] = useState();
    const [rawPartPlayed, setRawPartPlayed] = useState();
    const [mousePosition, setMousePosition] = useState(0);
    const songToPlay = musicData.find(music => music.id === props.imageId);
    const { isPlayingSong } = props;

    const getTime = useCallback(time => {
        var minutes = parseInt(time / 60, 10);
        if (minutes / 10 < 1) {
            minutes = '0' + minutes.toString();
        }
        var seconds = parseInt(time % 60);
        if (seconds / 10 < 1) {
            seconds = '0' + seconds.toString();
        }
        return minutes + ':' + seconds;
    }, []);

    const getRawTime = useCallback(time => {
        var minutes = parseInt(time / 60, 10);
        if (minutes / 10 < 1) {
            minutes = '0' + minutes.toString();
        }
        var seconds = parseInt(time % 60);
        if (seconds / 10 < 1) {
            seconds = '0' + seconds.toString();
        }
        return minutes + seconds;
    }, []);

    const updateMousePosition = event => {
        setMousePosition((event.clientX / window.innerWidth) * rawDuration * 0.64);
        console.log((event.clientX / window.innerWidth) * rawDuration);
    }

    useEffect(() => {
        if (audio) {
            audio.currentTime = mousePosition;
        }
    }, [mousePosition]);

    useEffect(() => {
        if (audio) {
            audio.pause();
        }
        if (songToPlay) {
            audio = new Audio(songToPlay.songUrl);
            audio.addEventListener('timeupdate', event => {
                setPartPlayed(getTime(event.target.currentTime));
                setDuration(getTime(event.target.duration));
                setRawPartPlayed(getRawTime(event.target.currentTime));
                setRawDuration(getRawTime(event.target.duration));
            });
            audio.play();

            return () => {
                audio.removeEventListener('timeupdate', () => { });
            }
        }
    }, [songToPlay]);

    useEffect(() => {
        if (!isPlayingSong) {
            audio.pause();
            setDuration();
            setPartPlayed();
        } else {
            audio.play();
        }
    }, [isPlayingSong]);

    const controlHandler = inputIdentifier => {
        if (inputIdentifier === 'pause') {
            props.onClick(false);
            //setIsPlay(!isPlay);
            audio.pause();
        } else if (inputIdentifier === 'play') {
            props.onClick(true);
            //setIsPlay(!isPlay);
            audio.play();
        }
    }

    return (
        <div className={classes.actionContainer}>
            {rawPartPlayed && rawDuration ?
                <progress onClick={updateMousePosition} className={classes.progress} value={rawPartPlayed} max={rawDuration} /> : null}
            <div className={classes.controller}>
                <img src="https://icon-library.com/images/sound_next_song_764771.png" className={classes.play} onClick={props.onNextPrevClick.bind(this, "previous")} />
                {isPlayingSong ? <img src="https://simpleicon.com/wp-content/uploads/pause.png" className={classes.play} onClick={controlHandler.bind(this, 'pause')} /> :
                    <img src="https://www.vhv.rs/dpng/d/100-1000848_play-icon-svg-hd-png-download.png" className={classes.play} onClick={controlHandler.bind(this, 'play')} />}
                <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/next-song-2223115-1861917.png" className={classes.play} onClick={props.onNextPrevClick.bind(this, "next")} />
            </div>
            <p>{partPlayed}/ {duration}</p>
            <p className={classes.songName}>{songToPlay.songName}</p>
        </div>
    )
}

export default PlayerAction;