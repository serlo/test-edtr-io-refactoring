import { EditorPlugin, EditorPluginProps, ObjectStateType, StringStateType } from '../plugin';
import { DeepPartial } from '../ui';
/**
 * @param config - {@link VideoConfig | Plugin configuration}
 * @public
 */ export declare function createVideoPlugin(config?: VideoConfig): EditorPlugin<VideoPluginState, VideoConfig>;
/** @public */
export interface VideoConfig {
    i18n?: DeepPartial<VideoPluginConfig['i18n']>;
}
/** @public */
export type VideoPluginState = ObjectStateType<{
    src: StringStateType;
    alt: StringStateType;
}>;
/** @public */
export interface VideoPluginConfig {
    i18n: {
        src: {
            label: string;
        };
        alt: {
            label: string;
        };
    };
}
/** @public */
export type VideoProps = EditorPluginProps<VideoPluginState, VideoConfig>;
