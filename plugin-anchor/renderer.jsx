import { styled } from '../ui';
import * as React from 'react';
const Anchor = styled.a({
    visibility: 'hidden',
});
export function AnchorRenderer(props) {
    return <Anchor id={props.state.value}/>;
}
