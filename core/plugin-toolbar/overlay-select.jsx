import * as React from 'react';
import { PluginToolbarContext } from '../contexts';
/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlaySelect}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlaySelectProps}
 * @public
 */
export function OverlaySelect(props) {
    const { OverlaySelect } = React.useContext(PluginToolbarContext);
    return <OverlaySelect {...props}/>;
}
