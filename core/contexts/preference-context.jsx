import * as React from 'react';
/** @beta */
export const PreferenceContext = React.createContext({
    getKey: () => { },
    setKey: () => { },
});
const store = {};
/**
 * Sets a preference
 *
 * @param key - The preference
 * @param val - The value
 * @beta
 */
export function setDefaultPreference(key, val) {
    store[key] = val;
}
export function PreferenceContextProvider({ children, }) {
    const [state, setState] = React.useState(1);
    function setKey(key, val) {
        store[key] = val;
        setState(state + 1);
    }
    function getKey(key) {
        return store[key];
    }
    return (<PreferenceContext.Provider value={{ setKey, getKey }}>
      {children}
    </PreferenceContext.Provider>);
}
