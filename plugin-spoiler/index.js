import { child, object, string, } from '../plugin';
import { SpoilerEditor } from './editor';
/**
 * @param config - {@link SpoilerConfig | Plugin configuration}
 * @public
 */ export function createSpoilerPlugin(config) {
    const { content } = config;
    return {
        Component: SpoilerEditor,
        config,
        state: object({
            title: string(''),
            content: child(content),
        }),
    };
}
