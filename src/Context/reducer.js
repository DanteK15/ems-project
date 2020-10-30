// initial state is an object
// data lives in here, the term will change
// TODO: See arrow suggestions
export const initialState = {
    hospitals: [],
    helicopters: [],
    gmaps: {},
    patientLocal: {},
    destination: {}

}

// whenever we change the data layer, we dispatch an action
// that changes/sets the serch term
export const actionTypes = {
    SET_HOSP: 'SET_HOSP',
    SET_HELI: 'SET_HELI',
    SET_MAPS: 'SET_MAPS',
    SET_LOC: 'SET_LOC',
    SET_DEST: 'SET_DEST',
}

// state is state of data layer, action is whatever we're dispatching to 
// context api
// reducer's job is to listen to dispatch action, otherwise it returns default
const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_HOSP:
            return {
                ...state,
                hospitals: [...action.hospitals], // <-- [...fromStorage, ...action.hospitals]
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