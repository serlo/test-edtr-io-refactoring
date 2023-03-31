import { string, } from '../plugin';
import { AnchorEditor } from './editor';
/**
 * @param config - {@link AnchorConfig | Plugin configuration}
 * @public
 */
export function createAnchorPlugin(config = {}) {
    return {
        Component: AnchorEditor,
        config,
        state: string(),
    };
}
