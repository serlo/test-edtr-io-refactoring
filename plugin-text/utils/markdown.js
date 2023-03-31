import { ListsEditor, ListType } from '@prezly/slate-lists';
import { Transforms, Editor as SlateEditor, Node } from 'slate';
const handleMarkdown = (chars, editor) => {
    switch (chars) {
        case '*':
        case '-':
        case '+':
            return createUnorderedList(editor);
        case '#':
            return createHeading(1, editor);
        case '##':
            return createHeading(2, editor);
        case '###':
            return createHeading(3, editor);
        default:
            return undefined;
    }
};
function createUnorderedList(editor) {
    ListsEditor.wrapInList(editor, ListType.UNORDERED);
    return true;
}
function createHeading(level, editor) {
    Transforms.setNodes(editor, { type: 'h', level });
    return true;
}
const onSpace = (event, editor) => {
    const { selection } = editor;
    if (selection) {
        const nodes = Array.from(SlateEditor.nodes(editor, { at: selection }));
        if (nodes.length >= 2) {
            const startBlock = nodes[2][0];
            const text = Node.string(startBlock);
            const chars = text.slice(0, selection?.focus.offset).replace(/\s*/g, '');
            const handled = handleMarkdown(chars, editor);
            if (handled) {
                event.preventDefault();
                editor.deleteBackward('word');
            }
        }
    }
};
export const markdownShortcuts = () => {
    return {
        onKeyDown(event, editor) {
            switch (event.key) {
                case ' ':
                    return onSpace(event, editor);
                default:
                    return;
            }
        },
    };
};
