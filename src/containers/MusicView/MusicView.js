import React, { useState } from 'react';
import classes from './MusicView.css';
//import { musicData } from '../../data/data';
import Card from '../../components/Card/Card';
import PlayerAction from '../../components/PlayerAction/PlayerAction';
import { useSelector } from 'react-redux';

const MusicView = props => {
    const [imageId, setImageId] = useState();
    const [isPlay, setIsPlay] = useState(false);
    const musicData = useSelector(state => state.music.musicData);

    const nextPrevHandler = identifier => {
        if(identifier === 'previous') {
            if(+imageId !== 0) {
                setImageId(+imageId - 1);
                setIsPlay(true);
            }
        }
        if(identifier === 'next') {
            if(+imageId !== (musicData.length - 1)) {
                setImageId(+imageId + 1);
                setIsPlay(true);
            }
        }
    }

    return (
        <div style={{ overflowY: 'auto' }}>
            <div className={classes.container}>
                <div className={classes.MusicView}>
                    {musicData.map(music =>
                        <Card key={music.id} author={music.author} songName={music.songName} url={music.url} songUrl={music.songUrl}
                            isItPlaying={imageId === music.id && isPlay}
                            onClick={isPlaying => {
                                console.log('clicked', music.id);
                                setIsPlay(isPlaying);
                                setImageId(+music.id);
                                setImageId(+music.id);
                            }} />)}
                </div>
                {imageId >= 0 ? <PlayerAction imageId={imageId} isPlayingSong={isPlay} onNextPrevClick={nextPrevHandler} onClick={isPlaying => {
                    setIsPlay(isPlaying);
                }} /> : null}
            </div>
        </div>
    )
}

export default MusicView;