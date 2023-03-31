import { SubReducer } from '../helpers';
import { Selector } from '../storetypes';
/** @internal */
export declare const focusReducer: SubReducer<string | null>;
/**
 * [[Selector]] that returns the id of the focused element (if there is any)
 *
 * @returns id of the focused element (`null` if there is no focused element)
 * @public
 */
export declare const getFocused: Selector<string | null, []>;
/**
 * [[Selector]] that checks whether the document with the given id is focused
 *
 * @param id - id of the document to check
 * @returns `true` if the given document is focused
 * @public
 */
export declare const isFocused: Selector<boolean, [string]>;
/**
 * [[Selector]] that returns the focus tree from the root document with the given id
 *
 * @param id - optional id of the document that should be considered as the root of the focus tree. By default, we use the root document of the current scope
 * @returns the [[focus tree|Node]] if it exists (`null` otherwise)
 * @public
 */
export declare const getFocusTree: Selector<Node | null, [string?]>;
/** @public */
export declare const getParent: Selector<Node | null, [string]>;
/**
 * [[Selector]] that returns the focus path from the leaf with the given id
 *
 * @param defaultLeaf - optional id of the document that should be considered as the leaf of the focus path. By default, we use the currently focused document of the current scope
 * @returns an array of ids of the documents that are part of the focus path (i.e. the focused document and their ancestors). `null`, if there exists no focus path
 * @public
 */
export declare const getFocusPath: Selector<string[] | null, [string?]>;
/**
 * [[Selector]] that checks whether the document with the given id has a focused child. In contrast to [[hasFocusedDescendant]], this only returns `true` if the focused document is a direct child of the document.
 *
 * @param id - id of the document to check
 * @returns `true` if the given document has a focused child
 * @public
 */
export declare const hasFocusedChild: Selector<boolean, [string]>;
/**
 * [[Selector]] that checks whether the document with the given id has a focused descendant. In contrast to [[hasFocusedChild]], this also returns `true` if the focused document is an indirect child (e.g. a child of a child of a child).
 *
 * @param id - id of the document to check
 * @returns `true` if the given document has a focused descendant
 * @public
 */
export declare const hasFocusedDescendant: Selector<boolean, [string]>;
/**
 * Finds the next node in a focus tree in focus order
 *
 * @param root - focus tree
 * @param from - id of the current document
 * @returns the id of the next document if it exists (`null` otherwise)
 * @public
 */
export declare function findNextNode(root: Node, from: string): string | null;
/**
 * Finds the previous node in a focus tree in focus order
 *
 * @param root - focus tree
 * @param from - id of the current document
 * @returns the id of the previous document if it exists (`null` otherwise)
 * @public
 */
export declare function findPreviousNode(root: Node, from: string): string | null;
/**
 * Finds the parent node of an id in the focus tree
 *
 * @param root - focus tree
 * @param id - id of the current node
 * @returns the `Node` of the parent, if the id exists in the focus tree. (`null` otherwise)
 * @public
 */
export declare function findParent(root: Node, id: string): Node | null;
/** @public */
export interface Node {
    id: string;
    children?: Node[];
}
