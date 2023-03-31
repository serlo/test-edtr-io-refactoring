import { EditorPlugin, EditorPluginProps, StringStateType } from '../plugin';
/**
 * @param config - {@link SerloInjectionConfig | Plugin configuration}
  @public */
export declare function createSerloInjectionPlugin(config?: SerloInjectionConfig): EditorPlugin<SerloInjectionPluginState, SerloInjectionConfig>;
/** @public */
export interface SerloInjectionConfig {
    i18n?: Partial<SerloInjectionPluginConfig['i18n']>;
}
/** @public */
export type SerloInjectionPluginState = StringStateType;
/** @public */
export interface SerloInjectionPluginConfig {
    i18n: {
        label: string;
        placeholder: string;
    };
}
/** @public */
export type SerloInjectionProps = EditorPluginProps<SerloInjectionPluginState, SerloInjectionConfig>;
