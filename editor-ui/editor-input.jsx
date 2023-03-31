import { styled, useEditorUiTheme } from '../ui';
import * as React from 'react';
function useEditorInputTheme() {
    return useEditorUiTheme('input', (theme) => {
        return {
            color: theme.backgroundColor,
            backgroundColor: 'transparent',
            highlightColor: theme.primary.background,
        };
    });
}
const Label = styled.label(({ width }) => {
    const theme = useEditorInputTheme();
    return {
        width,
        color: theme.color,
    };
});
const Input = styled.input(({ textWidth }) => {
    const theme = useEditorInputTheme();
    return {
        backgroundColor: theme.backgroundColor,
        border: 'none',
        width: textWidth,
        borderBottom: `2px solid ${theme.color}`,
        color: theme.color,
        paddingLeft: '10px',
        '&:focus': {
            outline: 'none',
            borderBottom: `2px solid ${theme.highlightColor}`,
        },
    };
});
/** @public */
export const EditorInput = React.forwardRef(function EditorInput({ label, ...props }, ref) {
    return (<Label width={props.width}>
        {label ? `${label}:` : ''}
        <Input textWidth={props.inputWidth} {...props} ref={ref}/>
      </Label>);
});
