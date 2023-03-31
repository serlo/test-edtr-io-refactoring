import * as React from 'react';
export function BlockquoteRenderer(props) {
    return <blockquote>{props.state.render()}</blockquote>;
}
