import { Editor as SlateEditor, Element } from 'slate';
export declare function selectionHasElement(predicate: (element: Element) => boolean, editor: SlateEditor): boolean;
export declare function trimSelection(editor: SlateEditor): null | undefined;
