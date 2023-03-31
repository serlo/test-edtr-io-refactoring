import { EditorPlugin, EditorPluginProps, StringStateType } from '../plugin';
/**
 * @param config - {@link AnchorConfig | Plugin configuration}
 * @public
 */
export declare function createAnchorPlugin(config?: AnchorConfig): EditorPlugin<AnchorPluginState, AnchorConfig>;
/** @public */
export interface AnchorConfig {
    i18n?: Partial<AnchorPluginConfig['i18n']>;
}
/** @public */
export type AnchorPluginState = StringStateType;
/** @public */
export interface AnchorPluginConfig {
    i18n: {
        label: string;
        placeholder: string;
    };
}
/** @public */
export type AnchorProps = EditorPluginProps<AnchorPluginState, AnchorConfig>;
