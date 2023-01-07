import {createContext, useContext, useReducer} from 'react'

export const Context = createContext();

export const ContextProvider = ({reducer, initialState, children}) => (
    <Context.Provider value={useReducer(reducer, initialState)}>
        {children}
    </Context.Provider>
)

export const useStateValue = () => useContext(Context)