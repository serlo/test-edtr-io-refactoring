import { ChildStateType, ChildStateTypeConfig, EditorPlugin, EditorPluginProps, ObjectStateType, StringStateType } from '../plugin';
import { DeepPartial } from '../ui';
/**
 * @param config - {@link SpoilerConfig | Plugin configuration}
 * @public
 */ export declare function createSpoilerPlugin(config: SpoilerConfig): EditorPlugin<SpoilerPluginState, SpoilerConfig>;
/** @public */
export interface SpoilerConfig {
    content: ChildStateTypeConfig;
    i18n?: DeepPartial<SpoilerPluginConfig['i18n']>;
    theme?: Partial<SpoilerPluginConfig['theme']>;
}
/** @public */
export type SpoilerPluginState = ObjectStateType<{
    title: StringStateType;
    content: ChildStateType;
}>;
/** @public */
export interface SpoilerPluginConfig {
    i18n: {
        title: {
            placeholder: string;
        };
    };
    theme: {
        color: string;
    };
}
/** @public */
export type SpoilerProps = EditorPluginProps<SpoilerPluginState, SpoilerConfig>;
