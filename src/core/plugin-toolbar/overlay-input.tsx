import * as InternalPluginToolbar from '../../internal__plugin-toolbar'
import * as React from 'react'

import { PluginToolbarContext } from '../contexts'

/**
 * Renders the {@link @edtr-io/plugin-toolbar#PluginToolbar | OverlayInput}
 *
 * @param props - {@link @edtr-io/plugin-toolbar#OverlayInputProps}
 * @public
 */
export function OverlayInput(props: OverlayInputProps) {
  const { OverlayInput } = React.useContext(PluginToolbarContext)
  return <OverlayInput {...props} ref={undefined} />
}
/** @public */
export type OverlayInputProps = InternalPluginToolbar.OverlayInputProps
