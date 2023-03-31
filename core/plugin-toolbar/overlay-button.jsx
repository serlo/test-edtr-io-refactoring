import * as React from 'react';
import { PluginToolbarContext } from '../contexts';
/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayButton}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayButtonProps}
 * @public
 */
export function OverlayButton(props) {
    const { OverlayButton } = React.useContext(PluginToolbarContext);
    return <OverlayButton {...props}/>;
}
