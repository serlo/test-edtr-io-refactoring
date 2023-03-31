import { EditorPlugin } from '../internal__plugin';
import { ChangeListener, StoreEnhancerFactory } from '../store';
import { CustomTheme } from '../ui';
import * as React from 'react';
import { DocumentEditorContext, PluginToolbarContext } from './contexts';
import { ErrorContext } from './store';
/**
 * Renders a single editor for an Edtr.io document
 *
 * @param props - The {@link EditorProps | props}
 * @public
 */
export declare function Editor<K extends string = string>(props: EditorProps<K>): JSX.Element;
/**
 * Hydrates the required contexts
 *
 * @param props - The props
 * @beta
 */
export declare function EditorProvider(props: EditorProviderProps): JSX.Element;
/** @public */
export interface EditorProviderProps {
    omitDragDropContext?: boolean;
    createStoreEnhancer?: StoreEnhancerFactory;
    children: React.ReactNode;
}
/**
 * Renders an editor for an Edtr.io document
 *
 * @param props - The {@link EditorProps | props} for the document
 * @beta
 */
export declare function Document<K extends string = string>(props: Omit<EditorProps<K>, 'initialState'> & {
    scope: string;
} & ({
    mirror: true;
    initialState?: unknown;
} | {
    mirror?: false;
    initialState: EditorProps<K>['initialState'];
})): JSX.Element | null;
export declare function InnerDocument<K extends string = string>({ children, plugins, scope, editable, theme, onChange, onError, DocumentEditor, PluginToolbar, ...props }: Omit<EditorProps<K>, 'initialState'> & {
    scope: string;
} & ({
    mirror: true;
    initialState?: unknown;
} | {
    mirror?: false;
    initialState: EditorProps<K>['initialState'];
})): JSX.Element | null;
/** @public */
export interface EditorProps<K extends string = string> {
    omitDragDropContext?: boolean;
    children?: React.ReactNode | ((document: React.ReactNode) => React.ReactNode);
    plugins: Record<K, EditorPlugin>;
    initialState: {
        plugin: string;
        state?: unknown;
    };
    theme?: CustomTheme;
    onChange?: ChangeListener;
    editable?: boolean;
    createStoreEnhancer?: StoreEnhancerFactory;
    onError?: React.ContextType<typeof ErrorContext>;
    DocumentEditor?: React.ContextType<typeof DocumentEditorContext>;
    PluginToolbar?: React.ContextType<typeof PluginToolbarContext>;
}
