import * as React from 'react';
import { PluginToolbarContext } from '../contexts';
/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayInput}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayInputProps}
 * @public
 */
export function OverlayInput(props) {
    const { OverlayInput } = React.useContext(PluginToolbarContext);
    return <OverlayInput {...props} ref={undefined}/>;
}
