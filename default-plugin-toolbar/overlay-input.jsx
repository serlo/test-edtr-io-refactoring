import { styled } from '@edtr-io/ui';
import * as React from 'react';
const OverlayInputLabel = styled.label({
    color: 'rgba(51,51,51,0.95)',
    margin: '20px auto 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});
const OverlayInputLabelInner = styled.span({ width: '20%' });
const OverlayInputInner = styled.input(({ config }) => {
    return {
        backgroundColor: '#ffffff',
        border: 'none',
        borderBottom: '2px solid rgba(51,51,51,0.95)',
        color: 'rgba(51,51,51,0.95)',
        width: '75%',
        '&:focus': {
            outline: 'none',
            borderBottom: `2px solid ${config.primaryColor}`,
        },
    };
});
export function createOverlayInput(config) {
    const OverlayInput = React.forwardRef(function OverlayInput({ label, ...props }, ref) {
        return (<OverlayInputLabel>
          <OverlayInputLabelInner>{label}</OverlayInputLabelInner>
          <OverlayInputInner {...props} ref={ref} config={config}/>
        </OverlayInputLabel>);
    });
    return OverlayInput;
}
