import * as React from 'react';
import { PluginToolbarContext } from '../contexts';
/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | PluginToolbarOverlayButton}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#PluginToolbarOverlayButtonProps}
 * @public
 */
export function PluginToolbarOverlayButton(props) {
    const { PluginToolbarOverlayButton } = React.useContext(PluginToolbarContext);
    return <PluginToolbarOverlayButton {...props}/>;
}
