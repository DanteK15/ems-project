// initial state is an object
// TODO: Try changing this to a function that will first load from Local Storage, then return state
export const initialState = {
    hospitals: [],      // List of saved hospital Places Objects
    helicopters: [],    // List of saved helicopter Places Objects
    gmaps: {},          // Gmaps instance, contains Map instance and Map object   
    patientLocal: {},   // Patient location places object <-- TODO: consider changing just lat/lng object
    calcParams: {}, // Contains all params needs for calculation: patient, hospital, helicopter, loadtime
    Polyline: {}, //Polyline class is a linear overlay of connected line segments on the map.
    directionsRenderer: {}, //Class to render directions obtained from the DirectionsService
    directionsService: {}, //Instance of a DirectionsService that sends directions queries to Google servers.

    // Will need patientLocal, destination, heliOrigin for calculation
}

// whenever we change the data layer, we dispatch an action
// TODO: Add delete actions for Helicopter & Hospitals
// TODO: Add clear action to reset patientLocal, destination, heliOrigin
export const actionTypes = {
    SET_HOSP: 'SET_HOSP',
    DEL_HOSP: 'DEL_HOSP',
    SET_HELIS: 'SET_HELIS',
    DEL_HELI: 'DEL_HELI',
    SET_MAPS: 'SET_MAPS',
    SET_LOC: 'SET_LOC',
    SET_CALC: 'SET_CALC',
    SET_POLY: 'SET_POLY',
    SET_REND: 'SET_REND',
    SET_SERV: 'SET_SERV',
}

// state is state of data layer, action is whatever we're dispatching to 
// context api
// reducer's job is to listen to dispatch action, otherwise it returns default
const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_HOSP:
            return {
                ...state,
                hospitals: [...state.hospitals, action.hospital],
            };
        case actionTypes.DEL_HOSP:
            return {
                ...state,
                hospitals: state.hospitals.filter((_,index) => index !== action.index)
            }
        case actionTypes.SET_HELIS:
            return {
                ...state,
                helicopters: [...state.helicopters, action.helicopter],
            }
        case actionTypes.DEL_HELI:
            return {
                ...state,
                helicopters: state.helicopters.filter((_,index) => index !== action.index)
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
        case actionTypes.SET_POLY:
            return {
                ...state,
                polyline: action.polyline
            }
        case actionTypes.SET_REND:
            return {
                ...state,
                directionsRenderer: action.directionsRenderer
            }
        case actionTypes.SET_SERV:
            return {
                ...state,
                directionsService: action.directionsService
            }
        default:
            return state;
    }
};

export default reducer;