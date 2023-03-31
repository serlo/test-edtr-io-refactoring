import { styled } from '../ui';
import * as React from 'react';
const OverlayInputLabel = styled.label({
    color: 'rgba(51,51,51,0.95)',
    margin: '20px auto 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});
const OverlayInputLabelInner = styled.span({ width: '20%' });
const OverlaySelectInner = styled.div({
    width: '75%',
    textAlign: 'left',
});
const Select = styled.select((props) => {
    return {
        width: props.selectBoxWidth,
        borderRadius: '5px',
        outline: 'none',
    };
});
export function createOverlaySelect(_config) {
    return function OverlaySelect({ label, options, ...props }) {
        return (<OverlayInputLabel>
        <OverlayInputLabelInner>{label}</OverlayInputLabelInner>
        <OverlaySelectInner>
          <Select selectBoxWidth={props.width} onChange={props.onChange} value={props.value}>
            {options.map((option) => {
                return (<option key={option} value={option}>
                  {option}
                </option>);
            })}
          </Select>
        </OverlaySelectInner>
      </OverlayInputLabel>);
    };
}
