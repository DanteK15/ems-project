// initial state is an object
// data lives in here, the term will change
// TODO: See arrow suggestions
export const initialState = {
    term: [], // <-- change to hospitals
    // <--- add for helipads
    gmaps: {},
    patientLocal: {},
    destination: {}

}

// whenever we change the data layer, we dispatch an action
// that changes/sets the serch term
export const actionTypes = {
    SET_TERM: 'SET_TERM',
    SET_MAPS: 'SET_MAPS',
    SET_LOC: 'SET_LOC',
}

// state is state of data layer, action is whatever we're dispatching to 
// context api
// reducer's job is to listen to dispatch action, otherwise it returns default
const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_TERM:
            return {
                ...state,
                term: [...action.term],
            };
        case actionTypes.SET_MAPS:
            return {
                ...state,
                gmaps: action.gmaps
            }
        case actionTypes.SET_LOC:
            return {
                ...state,
                patientLocal: action.patientLocal
            }
        default:
            return state;
    }
};

export default reducer;