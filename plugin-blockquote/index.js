import { child, } from '../plugin';
import { BlockquoteRenderer } from './renderer';
/**
 * @param config - {@link BlockquoteConfig | Plugin configuration}
 * @public
 */
export function createBlockquotePlugin(config) {
    return {
        Component: BlockquoteRenderer,
        config: {},
        state: createState(),
    };
    function createState() {
        return child(config.content);
    }
}
