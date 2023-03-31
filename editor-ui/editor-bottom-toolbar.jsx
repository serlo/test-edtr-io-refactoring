import { styled, useEditorUiTheme } from '../ui';
/** @public */
// TODO: This is a workaround until API extractor supports import() types, see https://github.com/microsoft/rushstack/pull/1916
export const EditorBottomToolbar = styled.div(() => {
    const theme = useEditorUiTheme('bottomToolbar', (theme) => {
        return {
            backgroundColor: theme.backgroundColor,
            color: theme.color,
        };
    });
    return {
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        borderRadius: '4px',
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        bottom: '0',
        zIndex: 90,
        whiteSpace: 'nowrap',
    };
});
