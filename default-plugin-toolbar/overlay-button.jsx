import { styled } from '../ui';
import * as React from 'react';
const Button = styled.button(({ config }) => {
    return {
        margin: '3px',
        backgroundColor: '#ffffff',
        outline: 'none',
        border: '2px solid rgba(51,51,51,0.95)',
        color: 'rgba(51,51,51,0.95)',
        padding: '10px',
        borderRadius: '4px',
        minWidth: '125px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'transparent',
            color: 'rgb(70, 155, 255)',
            borderColor: config.primaryColor,
        },
    };
});
export function createOverlayButton(config) {
    return function OverlayButton({ children, label, ...props }) {
        return (<Button {...props} title={label} config={config}>
        {children || label}
      </Button>);
    };
}
