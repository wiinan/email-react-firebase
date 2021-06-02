import React, { createContext, useContext, useState } from 'react';

const Context = createContext();
export function useLocalContext() {
    return useContext(Context);
}
export function ContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('');
    const [appState,setAppState] = useState('login');
    const value = {
        currentUser,appState
    };
    return <Context.Provider value={value}>{children}</Context.Provider>
}