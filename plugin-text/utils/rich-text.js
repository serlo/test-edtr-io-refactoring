import { Editor as SlateEditor, Transforms } from 'slate';
import { selectionHasElement, trimSelection } from './selection';
export function isBoldActive(editor) {
    return SlateEditor.marks(editor)?.strong === true;
}
export function toggleBoldMark(editor) {
    trimSelection(editor);
    if (isBoldActive(editor)) {
        SlateEditor.removeMark(editor, 'strong');
    }
    else {
        SlateEditor.addMark(editor, 'strong', true);
    }
}
export function isItalicActive(editor) {
    return SlateEditor.marks(editor)?.em === true;
}
export function toggleItalicMark(editor) {
    trimSelection(editor);
    if (isItalicActive(editor)) {
        SlateEditor.removeMark(editor, 'em');
    }
    else {
        SlateEditor.addMark(editor, 'em', true);
    }
}
export function isCodeActive(editor) {
    return SlateEditor.marks(editor)?.code === true;
}
export function toggleCode(editor) {
    if (isCodeActive(editor)) {
        SlateEditor.removeMark(editor, 'code');
    }
    else {
        SlateEditor.addMark(editor, 'code', true);
    }
}
export function isAnyHeadingActive(editor) {
    return selectionHasElement((e) => e.type === 'h', editor);
}
export const isHeadingActive = (heading) => (editor) => {
    return selectionHasElement((e) => e.type === 'h' && e.level === heading, editor);
};
export const toggleHeading = (heading) => (editor) => {
    if (isHeadingActive(heading)(editor)) {
        Transforms.setNodes(editor, {
            type: 'p',
        });
        Transforms.unsetNodes(editor, 'level');
    }
    else {
        Transforms.setNodes(editor, {
            type: 'h',
            level: heading,
        });
    }
};
