import React, { createContext, useContext, useReducer } from 'react';

// preparing data layer
export const StateContext = createContext();

// higher order 
// initialState --> what data layer looks like when app loads
// reducer --> listen to changes
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// hook that allows pulling info from data layer
export const useStateValue = () => useContext(StateContext);