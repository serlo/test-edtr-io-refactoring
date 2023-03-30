import * as R from 'ramda';
import * as React from 'react';
import * as StyledComponents from 'styled-components';
import { defaultEditorTheme } from './editor-theme';
import { defaultRendererTheme, } from './renderer-theme';
const defaultTheme = {
    editor: defaultEditorTheme,
    editorUi: {},
    renderer: defaultRendererTheme,
    rendererUi: {},
};
/**
 * Provider to hydrate the context for the {@link Theme | Theme}
 *
 * @remarks
 * You probably don't want to use this component directly since it is already used by the core.
 * If you want to override the theme in some plugin, you probably want to use {@link ThemeProvider | ThemeProvider} instead.
 * @param props - A {@link CustomTheme | CustomTheme} that will be deeply merged with the {@link Theme | default Theme}, and children
 * @public
 */
export function RootThemeProvider(props) {
    const theme = React.useMemo(() => R.mergeDeepRight(defaultTheme, props.theme), [props.theme]);
    return <StyledComponents.ThemeProvider {...props} theme={theme}/>;
}
/**
 * Context used for the {@link Theme | Theme}, see also {@link https://styled-components.com/docs/advanced#theming | Theming }
 *
 * @public
 */
export const ThemeContext = StyledComponents.ThemeContext;
/**
 * React Hook to get the current {@link Theme | Theme}
 *
 * @returns The current {@link Theme | Theme}
 * @public
 */
export function useTheme() {
    return React.useContext(ThemeContext);
}
/**
 * Provider to override the current {@link Theme | theme}
 *
 * @param props - A {@link CustomTheme | CustomTheme} that will be deeply merged with the {@link Theme | current Theme}, and children
 * @public
 */
export function ThemeProvider(props) {
    const defaultTheme = useTheme();
    const theme = React.useMemo(() => {
        return R.mergeDeepRight(defaultTheme, props.theme);
    }, [defaultTheme, props.theme]);
    return <StyledComponents.ThemeProvider {...props} theme={theme}/>;
}
