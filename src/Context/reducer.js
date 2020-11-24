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
        Polyline: {}, //Polyline class is a linear overlay of connected line segments on the map.
        directionsRenderer: {}, //Class to render directions obtained from the DirectionsService
        directionsService: {}, //Instance of a DirectionsService that sends directions queries to Google servers.
        ambulanceMarker: {},
        helicopterMarker: {},
        helicopter_speed: {},
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
    SET_CALC: 'SET_CALC',
    SET_POLY: 'SET_POLY',
    SET_REND: 'SET_REND',
    SET_SERV: 'SET_SERV',
    SET_AMARK: 'SET_AMARK',
    SET_HMARK: 'SET_HMARK'
    SET_PARAMS: 'SET_PARAMS'
}

// state is state of data layer, action is whatever we're dispatching to 
// context api
// reducer's job is to listen to dispatch action, otherwise it returns default
const reducer = (state, action) => {
    let updatedList;
    switch (action.type) {
        case actionTypes.SET_HOSP:
            var hospital = {
                geometry:
                {
                    lat: action.hospital.geometry.location.lat(),
                    lng: action.hospital.geometry.location.lng()
                },
                address: action.hospital.formatted_address,
                name: action.hospital.name
            }
            updatedList = [...state.hospitals, hospital];
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
            var helicopter = {
                geometry:
                {
                    lat: action.helicopter.geometry.location.lat(),
                    lng: action.helicopter.geometry.location.lng()
                },
                address: action.helicopter.formatted_address,
                name: action.helicopter.name
            }
            updatedList = [...state.helicopters, helicopter];
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
            var patient = {
                geometry:
                {
                    lat: action.patientLocal.geometry.location.lat(),
                    lng: action.patientLocal.geometry.location.lng()
                },
                address: action.patientLocal.formatted_address,
                name: action.patientLocal.name
            }
            return {
                ...state,
                patientLocal: patient
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
        case actionTypes.SET_AMARK:
            return {
                ...state,
                ambulanceMarker: action.ambulanceMarker
            }
        case actionTypes.SET_HMARK:
            return {
                ...state,
                helicopterMarker: action.helicopterMarker
        case actionTypes.SET_PARAMS:
            return {
                ...state,
                helicopter_speed: action.helicopter_speed
            }
        default:
            return state;
    }
};

export default reducer;