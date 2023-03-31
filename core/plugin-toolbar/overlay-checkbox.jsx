import * as React from 'react';
import { PluginToolbarContext } from '../contexts';
/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayCheckbox}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayCheckboxProps}
 * @public
 */
export function OverlayCheckbox(props) {
    const { OverlayCheckbox } = React.useContext(PluginToolbarContext);
    return <OverlayCheckbox {...props}/>;
}
