import { Editor as SlateEditor } from 'slate';
export const isAnyColorActive = (editor) => typeof SlateEditor.marks(editor)?.color === 'number';
export const isColorActive = (colorIndex) => (editor) => SlateEditor.marks(editor)?.color === colorIndex;
export const resetColor = (editor) => {
    SlateEditor.removeMark(editor, 'color');
};
export const toggleColor = (colorIndex) => (editor) => {
    if (isColorActive(colorIndex)(editor)) {
        SlateEditor.removeMark(editor, 'color');
    }
    else {
        SlateEditor.addMark(editor, 'color', colorIndex);
    }
};
export const getColorIndex = (editor) => {
    return SlateEditor.marks(editor)?.color;
};
