import { styled } from '../ui';
import * as React from 'react';
const Row = styled.div({
    marginBottom: '25px',
});
export function RowsRenderer(props) {
    return (<React.Fragment>
      {props.state.map((row) => {
            return <Row key={row.id}>{row.render()}</Row>;
        })}
    </React.Fragment>);
}
