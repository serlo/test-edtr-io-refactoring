import * as React from 'react';
/** @beta */
export interface Preference {
    getKey: (key: string) => unknown;
    setKey: (key: string, val: unknown) => void;
}
/** @beta */
export declare const PreferenceContext: React.Context<Preference>;
/**
 * Sets a preference
 *
 * @param key - The preference
 * @param val - The value
 * @beta
 */
export declare function setDefaultPreference(key: string, val: unknown): void;
export declare function PreferenceContextProvider({ children, }: {
    children: React.ReactNode;
}): JSX.Element;
