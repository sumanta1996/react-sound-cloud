import { musicData } from '../data/data';
import { FILTER_DATA } from './musicData-actions';

const initialState = {
    musicData: musicData
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FILTER_DATA:
            return {
                ...state,
                musicData: musicData.filter(eachData => (eachData.songName.toLowerCase()).includes(action.word.toLowerCase()))
            }
        default: return state;
    }
}