import { ThemeProps as StyledThemeProps } from 'styled-components';
import { DeepPartial } from './deep-partial';
/** @public */
export interface RendererTheme {
    backgroundColor: string;
    color: string;
    primary: {
        color: string;
        background: string;
    };
    secondary: {
        color: string;
        background: string;
    };
    success: {
        color: string;
        background: string;
    };
    info: {
        color: string;
        background: string;
    };
    warning: {
        color: string;
        background: string;
    };
    danger: {
        color: string;
        background: string;
    };
}
/** @public */
export declare const defaultRendererTheme: RendererTheme;
/** @public */
export interface RendererUiTheme {
    expandableBox: {
        containerBorderColor: string;
        toggleBackgroundColor: string;
        toggleColor: string;
    };
    submitButton: {
        backgroundColor: string;
        hoverBackgroundColor: string;
        color: string;
        correctBackgroundColor: string;
        wrongBackgroundColor: string;
    };
}
/** @public */
export type RendererThemeProps = StyledThemeProps<{
    renderer: RendererTheme;
    rendererUi: DeepPartial<RendererUiTheme>;
}>;
/**
 * React Hook for the renderer theming
 *
 * @returns An object containing the current {@link RendererTheme | renderer theme} and {@link RendererUiTheme | renderer UI theme}
 * @public
 */
export declare function useRendererTheme(): {
    renderer: RendererTheme;
    rendererUi: DeepPartial<RendererUiTheme>;
};
/**
 * Creates a function that maps {@link RendererThemeProps} to the current theme of the specified renderer UI component
 *
 * @param key - The renderer UI component
 * @param createDefaultTheme - The {@link RendererUiThemeFactory | factory} for the default theme
 * @returns A function that accepts {@link RendererThemeProps} and returns the current theme of the specified component
 * @public
 */
export declare function createRendererUiTheme<K extends keyof RendererUiTheme>(key: K, createDefaultTheme: RendererUiThemeFactory<K>): (theme: {
    renderer: RendererTheme;
    rendererUi: DeepPartial<RendererUiTheme>;
}) => RendererUiTheme[K];
/**
 * React Hook for the theme of a renderer UI component
 *
 * @param key - The renderer UI component
 * @param createDefaultTheme - The {@link RendererUiThemeFactory | factory} for the default theme
 * @returns The current theme of the specified component
 * @public
 */
export declare function useRendererUiTheme<K extends keyof RendererUiTheme>(key: K, createDefaultTheme: RendererUiThemeFactory<K>): RendererUiTheme[K];
/** @public */
export type RendererUiThemeFactory<K extends keyof RendererUiTheme> = (theme: RendererTheme) => RendererUiTheme[K];
