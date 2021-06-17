import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

const Context = createContext();
const options = ['Primary', 'Social', 'Promotions', 'Updates'];
export function useLocalContext() {
    return useContext(Context);
}
export function ContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('');
    const [appState, setAppState] = useState('empty');
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [composeOpen, setComposeOpen] = useState(false);
    const [category, setCategory] = useState(options[0]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setAppState('loading')
                setCurrentUser(user)
            } else {
                setCurrentUser('')
                setAppState('login')
            }
        })
    }, [])
    const value = {
        currentUser, appState, setAppState, drawerOpen, setDrawerOpen, composeOpen, setComposeOpen, category, setCategory, options, setSnackbarOpen, snackbarOpen, setSnackbarMsg, snackbarMsg
    };
    return <Context.Provider value={value}>{children}</Context.Provider>
}