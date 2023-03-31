import { Editor as SlateEditor } from 'slate';
export declare const isAnyColorActive: (editor: SlateEditor) => boolean;
export declare const isColorActive: (colorIndex: number) => (editor: SlateEditor) => boolean;
export declare const resetColor: (editor: SlateEditor) => void;
export declare const toggleColor: (colorIndex: number) => (editor: SlateEditor) => void;
export declare const getColorIndex: (editor: SlateEditor) => number | undefined;
