import { EditorPlugin, EditorPluginProps, StringStateType } from '../plugin';
import * as React from 'react';
/**
 * @param config - {@link TableConfig | Plugin configuration}
 * @public
 */
export declare function createTablePlugin(config?: TableConfig): EditorPlugin<TablePluginState, TableConfig>;
/** @public */
export interface TableConfig {
    i18n?: Partial<TablePluginConfig['i18n']>;
    MarkdownRenderer?: TablePluginConfig['MarkdownRenderer'];
}
/** @public */
export type TablePluginState = StringStateType;
/** @public */
export interface TablePluginConfig {
    i18n: {
        placeholder: string;
    };
    MarkdownRenderer: React.ComponentType<{
        markdown: string;
    }>;
}
/** @public */
export type TableProps = EditorPluginProps<TablePluginState, TableConfig>;
