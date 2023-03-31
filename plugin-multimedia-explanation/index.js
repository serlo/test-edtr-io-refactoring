import { boolean, child, number, object, } from '../plugin';
import { MultimediaExplanationEditor } from './editor';
/**
 * @param config - {@link MultimediaExplanationConfig | Plugin configuration}
 * @public
 */
export function createMultimediaExplanationPlugin(config) {
    const { plugins, explanation } = config;
    return {
        Component: MultimediaExplanationEditor,
        config,
        state: object({
            explanation: child(explanation),
            multimedia: child({ plugin: plugins[0].name }),
            illustrating: boolean(true),
            width: number(50), // percent
        }),
    };
}
