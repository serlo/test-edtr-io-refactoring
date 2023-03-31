import * as React from 'react';
import { PluginToolbarContext } from '../contexts';
/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayTextarea}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayTextareaProps}
 * @public
 */
export function OverlayTextarea(props) {
    const { OverlayTextarea } = React.useContext(PluginToolbarContext);
    return <OverlayTextarea {...props}/>;
}
