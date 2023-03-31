import * as React from 'react';
import { PluginToolbarContext } from '../contexts';
/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | PluginToolbarButton}
 *
 * @public
 */
export const PluginToolbarButton = React.forwardRef(function PluginToolbarButton(props, ref) {
    const { PluginToolbarButton } = React.useContext(PluginToolbarContext);
    return <PluginToolbarButton {...props} ref={ref}/>;
});
