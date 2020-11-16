// TODO: Import error handling and call error handler if local storage fails to load


const getInitialState = () => {
    let hospitals, helicopters;
    if (typeof (Storage)) {
        // Local storage only accepts strings. 
        hospitals = JSON.parse(localStorage.getItem('hospitals'));
        helicopters = JSON.parse(localStorage.getItem('helicopters'));
    } else {
        // TODO: call error handler
    }

    return {
        hospitals: hospitals ? hospitals : [],      // List of saved hospital Places Objects
        helicopters: helicopters ? helicopters : [],    // List of saved helicopter Places Objects
        gmaps: {},          // Gmaps instance, contains Map instance and Map object   
        patientLocal: {},   // Patient location places object <-- TODO: consider changing just lat/lng object
        calcParams: {}, // Contains all params needs for calculation: patient, hospital, helicopter, loadtime
    }
}

export const initialState = getInitialState();
// initial state is an object
// export const initialState = {
//     hospitals: [],      // List of saved hospital Places Objects
//     helicopters: [],    // List of saved helicopter Places Objects
//     gmaps: {},          // Gmaps instance, contains Map instance and Map object   
//     patientLocal: {},   // Patient location places object <-- TODO: consider changing just lat/lng object
//     calcParams: {}, // Contains all params needs for calculation: patient, hospital, helicopter, loadtime
// }

// whenever we change the data layer, we dispatch an action
// TODO: Add clear action to reset patientLocal, destination, heliOrigin
export const actionTypes = {
    SET_HOSP: 'SET_HOSP',
    DEL_HOSP: 'DEL_HOSP',
    SET_HELIS: 'SET_HELIS',
    DEL_HELI: 'DEL_HELI',
    SET_MAPS: 'SET_MAPS',
    SET_LOC: 'SET_LOC',
    SET_CALC: 'SET_CALC'
}

// state is state of data layer, action is whatever we're dispatching to 
// context api
// reducer's job is to listen to dispatch action, otherwise it returns default
const reducer = (state, action) => {
    let updatedList;
    switch (action.type) {
        case actionTypes.SET_HOSP:
            updatedList = [...state.hospitals, action.hospital];
            localStorage.setItem('hospitals', JSON.stringify(updatedList));
            return {
                ...state,
                hospitals: updatedList
            };
        case actionTypes.DEL_HOSP:
            updatedList = state.hospitals.filter((_, index) => index !== action.index);
            localStorage.setItem('hospitals', JSON.stringify(updatedList));
            return {
                ...state,
                hospitals: updatedList
            }
        case actionTypes.SET_HELIS:
            updatedList = [...state.helicopters, action.helicopter];
            localStorage.setItem('helicopters', JSON.stringify(updatedList));
            return {
                ...state,
                helicopters: updatedList
            }
        case actionTypes.DEL_HELI:
            updatedList = state.helicopters.filter((_, index) => index !== action.index);
            localStorage.setItem('helicopters', JSON.stringify(updatedList));
            return {
                ...state,
                helicopters: updatedList 
            }
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
        case actionTypes.SET_CALC:
            return {
                ...state,
                calcParams: action.calcParams
            }
        default:
            return state;
    }
};

export default reducer;