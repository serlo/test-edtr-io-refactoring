import { styled } from '../../ui';
import * as React from 'react';
const InputInner = styled.input(({ theme }) => ({
    backgroundColor: theme.backgroundColor,
    border: 'none',
    borderBottom: `2px solid ${theme.color}`,
    color: theme.color,
    '&:focus': {
        outline: 'none',
        borderBottom: `2px solid ${theme.hoverColor}`,
    },
}));
const InputRefForward = (props, ref) => {
    return <InputInner {...props} ref={ref}/>;
};
export const LinkControlsInput = React.forwardRef(InputRefForward);
