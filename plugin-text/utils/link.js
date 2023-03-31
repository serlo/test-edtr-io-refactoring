import { Editor as SlateEditor, Element, Range, Transforms } from 'slate';
import { selectionHasElement } from './selection';
function matchLinks(node) {
    return Element.isElement(node) && node.type === 'a';
}
export function isLinkActive(editor) {
    return selectionHasElement((e) => e.type === 'a', editor);
}
export function getLinkElement(editor) {
    const [match] = Array.from(SlateEditor.nodes(editor, { match: matchLinks }));
    return match && match[0];
}
export function toggleLink(editor) {
    if (isLinkActive(editor)) {
        Transforms.unwrapNodes(editor, { match: matchLinks });
        return;
    }
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    if (isCollapsed) {
        Transforms.insertNodes(editor, {
            type: 'a',
            href: '',
            children: [{ text: ' ' }],
        });
        return;
    }
    Transforms.wrapNodes(editor, {
        type: 'a',
        href: '',
        children: [],
    }, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
}
