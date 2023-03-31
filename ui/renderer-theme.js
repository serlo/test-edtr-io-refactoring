import * as R from 'ramda';
import * as React from 'react';
import { ThemeContext as StyledThemeContext, } from 'styled-components';
/** @public */
export const defaultRendererTheme = {
    backgroundColor: '#ffffff',
    color: '#333333',
    primary: {
        color: '#ffffff',
        background: '#337ab7',
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
};
/**
 * React Hook for the renderer theming
 *
 * @returns An object containing the current {@link RendererTheme | renderer theme} and {@link RendererUiTheme | renderer UI theme}
 * @public
 */
export function useRendererTheme() {
    return React.useContext(StyledThemeContext);
}
/**
 * Creates a function that maps {@link RendererThemeProps} to the current theme of the specified renderer UI component
 *
 * @param key - The renderer UI component
 * @param createDefaultTheme - The {@link RendererUiThemeFactory | factory} for the default theme
 * @returns A function that accepts {@link RendererThemeProps} and returns the current theme of the specified component
 * @public
 */
export function createRendererUiTheme(key, createDefaultTheme) {
    return (theme) => {
        return R.mergeDeepRight(createDefaultTheme(theme.renderer), (theme.rendererUi[key] || {}));
    };
}
/**
 * React Hook for the theme of a renderer UI component
 *
 * @param key - The renderer UI component
 * @param createDefaultTheme - The {@link RendererUiThemeFactory | factory} for the default theme
 * @returns The current theme of the specified component
 * @public
 */
export function useRendererUiTheme(key, createDefaultTheme) {
    const theme = useRendererTheme();
    return createRendererUiTheme(key, createDefaultTheme)(theme);
}
