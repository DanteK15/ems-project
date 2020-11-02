// initial state is an object
// TODO: Try changing this to a function that will first load from Local Storage, then return state
export const initialState = {
    hospitals: [],      // List of saved hospital Places Objects
    helicopters: [],    // List of saved helicopter Places Objects
    gmaps: {},          // Gmaps instance, contains Map instance and Map object   
    patientLocal: {},   // Patient location places object <-- TODO: consider changing just lat/lng object
    destination: {},    // Destination hosptial places object
    heliOrigin: {}      // Helicopter origin places object

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
    SET_DEST: 'SET_DEST',
    SET_HELI: 'SET_HELI'
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
                hospitals: state.hospitals.filter((_,index) => index != action.index)
            }
        case actionTypes.SET_HELIS:
            return {
                ...state,
                helicopters: [...state.helicopters, action.helicopter],
            }
        case actionTypes.DEL_HELI:
            return {
                ...state,
                helicopters: state.helicopters.filter((_,index) => index != action.index)
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
        case actionTypes.SET_DEST:
            return {
                ...state,
                destination: action.destination
            }
        case actionTypes.SET_LOC:
            return {
                ...state,
                heliOrigin: action.heliOrigin
            }
        default:
            return state;
    }
};

export default reducer;