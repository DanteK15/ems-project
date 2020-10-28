// initial state is an object
// data lives in here, the term will change
export const initialState = {
    term: [],
    locations: []
}

// whenever we change the data layer, we dispatch an action
// that changes/sets the serch term
export const actionTypes = {
    SET_TERM: 'SET_TERM',
    SET_LOCATION: 'SET_LOCATION'
}

// state is state of data layer, action is whatever we're dispatching to 
// context api
// reducer's job is to listen to dispatch action, otherwise it returns default
const reducer = (state, action) => {
    switch(action.type) {
        case actionTypes.SET_TERM:
            return {
                ...state,
                term: [...action.term],
            };
        case actionTypes.SET_LOCATION:
            return {
                ...state,
                locations: [...action.locations]
            };
            default: 
                return state;
    }
};

export default reducer;