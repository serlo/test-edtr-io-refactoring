import { EditorPlugin, EditorPluginProps, StringStateType } from '../plugin';
/**
 * @param config - {@link GeogebraConfig | Plugin configuration}
 * @public
 */
export declare function createGeogebraPlugin(config?: GeogebraConfig): EditorPlugin<GeogebraPluginState, GeogebraConfig>;
/** @public */
export interface GeogebraConfig {
    i18n?: Partial<GeogebraPluginConfig['i18n']>;
}
/** @public */
export type GeogebraPluginState = StringStateType;
/** @public */
export interface GeogebraPluginConfig {
    i18n: {
        label: string;
        placeholder: string;
    };
}
/** @public */
export type GeogebraProps = EditorPluginProps<GeogebraPluginState, GeogebraConfig>;
