import { object, string, } from '../plugin';
import { VideoEditor } from './editor';
/**
 * @param config - {@link VideoConfig | Plugin configuration}
 * @public
 */ export function createVideoPlugin(config = {}) {
    return {
        Component: VideoEditor,
        config,
        state: object({ src: string(), alt: string() }),
        onText(value) {
            const regex = /^(https?:\/\/)?(.*?(youtube\.com\/watch\?(.*&)?v=.+|youtu\.be\/.+|vimeo\.com\/.+|upload\.wikimedia\.org\/.+(\.webm|\.ogg)?|br\.de\/.+))/;
            if (regex.test(value)) {
                return { state: { src: value, alt: '' } };
            }
        },
    };
}
