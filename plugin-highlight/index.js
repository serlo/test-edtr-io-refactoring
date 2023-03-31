import { boolean, object, string, } from '../plugin';
import { HighlightEditor } from './editor';
/**
 * @param config - {@link HighlightConfig | Plugin configuration}
 * @public
 */
export function createHighlightPlugin(config = {}) {
    return {
        Component: HighlightEditor,
        config,
        state: object({
            code: string(''),
            language: string('text'),
            showLineNumbers: boolean(false),
        }),
    };
}
