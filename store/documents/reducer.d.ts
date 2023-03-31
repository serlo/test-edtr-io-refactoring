import { EditorPlugin } from '@/internal__plugin';
import { SubReducer } from '../helpers';
import { DocumentState, Selector } from '../types';
/** @internal */
export declare const documentsReducer: SubReducer<Record<string, DocumentState>>;
/** @public */
export declare const getDocuments: Selector<Record<string, DocumentState>>;
/** @public */
export declare const getDocument: Selector<DocumentState | null, [string | null]>;
/**
 * Serializes the document with the given `id`
 *
 * @param id - The id of the document
 * @returns The serialization
 * @public
 */
export declare const serializeDocument: Selector<{
    plugin: string;
    state: any;
} | null, [
    string | null
]>;
/** @public */
export declare const isEmpty: Selector<boolean, [id: string]>;
/**
 * Checks whether the given document is empty
 *
 * @param doc - The document
 * @param plugin - The plugin
 * @returns `True` if the specified document is empty
 * @public
 */
export declare function isDocumentEmpty(doc: DocumentState | null, plugin: EditorPlugin | null): boolean;
