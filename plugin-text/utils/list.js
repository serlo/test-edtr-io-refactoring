import { ListsEditor, ListType } from '@prezly/slate-lists';
import { selectionHasElement } from './selection';
export function isOrderedListActive(editor) {
    return selectionHasElement((e) => e.type === 'ordered-list', editor);
}
export function isUnorderedListActive(editor) {
    return selectionHasElement((e) => e.type === 'unordered-list', editor);
}
export function toggleOrderedList(editor) {
    if (isUnorderedListActive(editor)) {
        ListsEditor.unwrapList(editor);
        ListsEditor.wrapInList(editor, ListType.ORDERED);
    }
    else if (isOrderedListActive(editor)) {
        ListsEditor.unwrapList(editor);
    }
    else {
        ListsEditor.wrapInList(editor, ListType.ORDERED);
    }
}
export function toggleUnorderedList(editor) {
    if (isOrderedListActive(editor)) {
        ListsEditor.unwrapList(editor);
        ListsEditor.wrapInList(editor, ListType.UNORDERED);
    }
    else if (isUnorderedListActive(editor)) {
        ListsEditor.unwrapList(editor);
    }
    else {
        ListsEditor.wrapInList(editor, ListType.UNORDERED);
    }
}
