import { BooleanStateType, EditorPlugin, EditorPluginProps, ObjectStateType, StringStateType } from '../plugin';
import { DeepPartial } from '../ui';
import * as React from 'react';
import type { HighlightRendererProps } from './renderer';
/**
 * @param config - {@link HighlightConfig | Plugin configuration}
 * @public
 */
export declare function createHighlightPlugin(config?: HighlightConfig): EditorPlugin<HighlightPluginState, HighlightConfig>;
/** @public */
export interface HighlightConfig {
    Renderer?: HighlightPluginConfig['Renderer'];
    i18n?: DeepPartial<HighlightPluginConfig['i18n']>;
}
/** @public */
export type HighlightPluginState = ObjectStateType<{
    code: StringStateType;
    language: StringStateType;
    showLineNumbers: BooleanStateType;
}>;
/** @public */
export interface HighlightPluginConfig {
    Renderer: React.ComponentType<HighlightRendererProps>;
    i18n: {
        code: {
            label: string;
            placeholder: string;
        };
        language: {
            label: string;
            placeholder: string;
        };
        showLineNumbers: {
            label: string;
        };
    };
}
export { HighlightRendererProps };
/** @public */
export type HighlightProps = EditorPluginProps<HighlightPluginState, HighlightConfig>;
