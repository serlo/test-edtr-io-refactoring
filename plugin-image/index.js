import { boolean, isTempFile, number, object, optional, string, upload, child, } from '../plugin';
import { ImageEditor } from './editor';
/**
 * @param config - {@link ImageConfig | Plugin configuration}
 * @public
 */
export function createImagePlugin(config) {
    return {
        Component: ImageEditor,
        config,
        state: object({
            src: upload(''),
            link: optional(object({
                href: string(''),
                openInNewTab: boolean(false),
            })),
            alt: optional(string('')),
            maxWidth: optional(number(0)),
            caption: optional(child({
                plugin: 'text',
                config: {
                    controls: ['code', 'katex', 'links', 'math', 'richText'],
                    noLinebreaks: true,
                    blockquote: '',
                },
            })),
        }),
        onText(value) {
            if (/\.(jpe?g|png|bmp|gif|svg)$/.test(value.toLowerCase())) {
                return {
                    state: {
                        src: value,
                        link: undefined,
                        alt: undefined,
                        maxWidth: undefined,
                        caption: { plugin: 'text' },
                    },
                };
            }
        },
        onFiles(files) {
            if (files.length === 1) {
                const file = files[0];
                const validation = config.validate(file);
                if (validation.valid) {
                    return {
                        state: {
                            src: { pending: files[0] },
                            link: undefined,
                            alt: undefined,
                            maxWidth: undefined,
                            caption: { plugin: 'text' },
                        },
                    };
                }
            }
        },
        isEmpty: (serializedState) => {
            return ((!serializedState.src.value || isTempFile(serializedState.src.value)) &&
                (!serializedState.link.defined || !serializedState.link.href.value) &&
                (!serializedState.alt.defined || !serializedState.alt.value) &&
                (!serializedState.caption.defined || !serializedState.caption.get()));
        },
    };
}
