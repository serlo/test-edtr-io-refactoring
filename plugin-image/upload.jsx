import { OverlayButton } from '../core';
import { EditorButton } from '../editor-ui';
import * as React from 'react';
export function Upload(props) {
    const input = React.useRef(null);
    return (<React.Fragment>
      {props.inOverlay ? (<OverlayButton onClick={selectFile} label={props.config.i18n.label}/>) : (<EditorButton onClick={selectFile}>
          {props.config.i18n.label}
        </EditorButton>)}
      <input type="file" multiple accept="image/*" style={{ display: 'none' }} ref={input} onChange={(event) => {
            if (event.target.files && event.target.files.length) {
                props.onFile(event.target.files[0]);
            }
        }}/>
    </React.Fragment>);
    function selectFile(e) {
        e.preventDefault();
        if (input.current) {
            input.current.click();
        }
    }
}
