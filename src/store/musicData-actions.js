export const FILTER_DATA = 'FILTER_DATA';

export const filterData = word => {
    return {
        type: FILTER_DATA,
        word: word
    }
}