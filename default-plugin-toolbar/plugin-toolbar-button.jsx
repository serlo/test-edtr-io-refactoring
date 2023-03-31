import * as React from 'react';
import { Button } from './button';
import { StyledIconContainer } from './icon-container';
export function createPluginToolbarButton(_config) {
    const PluginToolbarButton = React.forwardRef(function PluginToolbarButton(props, ref) {
        return (<div>
        <Button className={props.className} title={props.label} ref={ref} onClick={props.onClick}>
          <StyledIconContainer>{props.icon}</StyledIconContainer>
        </Button>
      </div>);
    });
    return PluginToolbarButton;
}
