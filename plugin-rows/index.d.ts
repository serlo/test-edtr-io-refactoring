import { ChildStateType, ChildStateTypeConfig, EditorPlugin, EditorPluginProps, ListStateType } from '../plugin';
import { DeepPartial } from '../ui';
import * as React from 'react';
/**
 * @param config - {@link RowsConfig | Plugin configuration}
 * @public
 */
export declare function createRowsPlugin(config: RowsConfig): EditorPlugin<RowsPluginState, RowsConfig>;
/** @public */
export interface RowsConfig extends Omit<RowsPluginConfig, 'i18n' | 'theme'> {
    content: ChildStateTypeConfig;
    i18n?: DeepPartial<RowsPluginConfig['i18n']>;
    theme?: DeepPartial<RowsPluginConfig['theme']>;
}
/** @public */
export type RowsPluginState = ListStateType<ChildStateType>;
/** @public */
export interface RowsPluginConfig {
    plugins: {
        name: string;
        title?: string;
        icon?: React.ComponentType;
        description?: string;
    }[];
    i18n: {
        menu: {
            searchPlaceholder: string;
        };
        settings: {
            duplicateLabel: string;
            removeLabel: string;
            closeLabel: string;
        };
        toolbar: {
            dragLabel: string;
        };
        addLabel: string;
    };
    theme: {
        backgroundColor: string;
        color: string;
        highlightColor: string;
        lightBackgroundColor: string;
        menu: {
            highlightColor: string;
            primary: {
                backgroundColor: string;
                color: string;
            };
            secondary: {
                backgroundColor: string;
                color: string;
            };
            dropzone: {
                highlightColor: string;
                backgroundColor: string;
                color: string;
                highlightBackgroundColor: string;
            };
        };
    };
}
/** @public */
export type RowsProps = EditorPluginProps<RowsPluginState, RowsConfig>;
export * from './registry-context';
export * from './store';
