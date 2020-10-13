// initial state is an object
// data lives in here, the term will change
export const initialState = {
    term: null,
}

// whenever we change the data layer, we dispatch an action
// that changes/sets the serch term
export const actionTypes = {
    SET_TERM: 'SET_TERM',
}

// state is state of data layer, action is whatever we're dispatching to 
// context api
// reducer's job is to listen to dispatch action, otherwise it returns default
const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case actionTypes.SET_TERM:
            return {
                ...state,
                term: action.term,
            };
            default: 
                return state;
    }
};

export default reducer;