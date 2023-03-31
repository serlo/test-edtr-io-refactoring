import { EditorTextarea } from '../editor-ui';
import { styled } from '../ui';
import * as React from 'react';
import { useTableConfig } from './config';
import { TableRenderer } from './renderer';
const Form = styled.form({
    marginTop: '10px',
});
export function TableEditor(props) {
    const { focused, state } = props;
    const config = useTableConfig(props.config);
    return (<div>
      {focused ? (<Form>
          <div>
            <EditorTextarea value={state.value} placeholder={config.i18n.placeholder} name="markdown" onChange={(e) => {
                state.set(e.target.value);
            }} ref={props.autofocusRef}>
              {state.value}
            </EditorTextarea>
            <TableRenderer {...props}/>
          </div>
        </Form>) : (<TableRenderer {...props}/>)}
    </div>);
}
