import * as R from 'ramda';
import * as React from 'react';
import { ThemeContext as StyledThemeContext, } from 'styled-components';
/** @public */
export const defaultEditorTheme = {
    primary: {
        color: '#ffffff',
        background: 'rgb(70, 155, 255)',
    },
    secondary: {
        color: '#333333',
        background: '#eeeeee',
    },
    success: {
        color: '#ffffff',
        background: '#5cb85c',
    },
    info: {
        color: '#ffffff',
        background: '#5bc0de',
    },
    warning: {
        color: '#ffffff',
        background: '#f0ad4e',
    },
    danger: {
        color: '#ffffff',
        background: '#d9534f',
    },
    color: '#EEEEEE',
    backgroundColor: 'rgba(51,51,51,0.95)',
};
/**
 * React Hook for the editor theming
 *
 * @returns An object containing the current {@link EditorTheme | editor theme} and {@link EditorUiTheme | editor UI theme}
 * @public
 */
export function useEditorTheme() {
    return React.useContext(StyledThemeContext);
}
/**
 * Creates a function that maps {@link EditorThemeProps} to the current theme of the specified editor UI component
 *
 * @param key - The editor UI component
 * @param createDefaultTheme - The {@link EditorUiThemeFactory | factory} for the default theme
 * @returns A function that accepts {@link EditorThemeProps} and returns the current theme of the specified component
 * @public
 */
export function createEditorUiTheme(key, createDefaultTheme) {
    return (theme) => {
        return R.mergeDeepRight(createDefaultTheme(theme.editor), (theme.editorUi[key] || {}));
    };
}
/**
 * React Hook for the theme of an editor UI component
 *
 * @param key - The editor UI component
 * @param createDefaultTheme - The {@link EditorUiThemeFactory | factory} for the default theme
 * @returns The current theme of the specified component
 * @public
 */
export function useEditorUiTheme(key, createDefaultTheme) {
    const theme = useEditorTheme();
    return createEditorUiTheme(key, createDefaultTheme)(theme);
}
