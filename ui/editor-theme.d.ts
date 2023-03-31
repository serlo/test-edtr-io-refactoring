import { ThemeProps as StyledThemeProps } from 'styled-components';
import { DeepPartial } from './deep-partial';
/** @public */
export interface EditorTheme {
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
export declare const defaultEditorTheme: EditorTheme;
/** @public */
export interface EditorUiTheme {
    button: {
        backgroundColor: string;
        color: string;
        borderColor: string;
        hoverBackgroundColor: string;
        hoverColor: string;
        hoverBorderColor: string;
    };
    checkbox: {
        boxSelectedColor: string;
        boxDeselectedColor: string;
        color: string;
    };
    input: {
        backgroundColor: string;
        color: string;
        highlightColor: string;
    };
    bottomToolbar: {
        backgroundColor: string;
        color: string;
    };
}
/** @public */
export type EditorThemeProps = StyledThemeProps<{
    editor: EditorTheme;
    editorUi: DeepPartial<EditorUiTheme>;
}>;
/**
 * React Hook for the editor theming
 *
 * @returns An object containing the current {@link EditorTheme | editor theme} and {@link EditorUiTheme | editor UI theme}
 * @public
 */
export declare function useEditorTheme(): {
    editor: EditorTheme;
    editorUi: DeepPartial<EditorUiTheme>;
};
/**
 * Creates a function that maps {@link EditorThemeProps} to the current theme of the specified editor UI component
 *
 * @param key - The editor UI component
 * @param createDefaultTheme - The {@link EditorUiThemeFactory | factory} for the default theme
 * @returns A function that accepts {@link EditorThemeProps} and returns the current theme of the specified component
 * @public
 */
export declare function createEditorUiTheme<K extends keyof EditorUiTheme>(key: K, createDefaultTheme: EditorUiThemeFactory<K>): (theme: {
    editor: EditorTheme;
    editorUi: DeepPartial<EditorUiTheme>;
}) => EditorUiTheme[K];
/**
 * React Hook for the theme of an editor UI component
 *
 * @param key - The editor UI component
 * @param createDefaultTheme - The {@link EditorUiThemeFactory | factory} for the default theme
 * @returns The current theme of the specified component
 * @public
 */
export declare function useEditorUiTheme<K extends keyof EditorUiTheme>(key: K, createDefaultTheme: EditorUiThemeFactory<K>): EditorUiTheme[K];
/** @public */
export type EditorUiThemeFactory<K extends keyof EditorUiTheme> = (theme: EditorTheme) => EditorUiTheme[K];
