import { ListType, withLists as withListsPlugin, withListsReact, } from '@prezly/slate-lists';
import { Element } from 'slate';
// TODO: Use enum for types here as in https://www.npmjs.com/package/@prezly/slate-lists
// TODO: Fix "as ..." parts in the functions
export const withLists = (editor) => {
    const editorWithListsPlugin = withListsPlugin({
        isConvertibleToListTextNode(node) {
            return Element.isElementType(node, 'p');
        },
        isDefaultTextNode(node) {
            return Element.isElementType(node, 'p');
        },
        isListNode(node, type) {
            if (type) {
                return Element.isElementType(node, type);
            }
            return (Element.isElementType(node, 'ordered-list') ||
                Element.isElementType(node, 'unordered-list'));
        },
        isListItemNode(node) {
            return Element.isElementType(node, 'list-item');
        },
        isListItemTextNode(node) {
            return Element.isElementType(node, 'list-item-child');
        },
        createDefaultTextNode(props = {}) {
            return { children: [{ text: '' }], ...props, type: 'p' };
        },
        createListNode(type = ListType.UNORDERED, props = {}) {
            const nodeType = type === ListType.ORDERED ? 'ordered-list' : 'unordered-list';
            return { children: [{ text: '' }], ...props, type: nodeType };
        },
        createListItemNode(props = {}) {
            return {
                children: [{ text: '' }],
                ...props,
                type: 'list-item',
            };
        },
        createListItemTextNode(props = {}) {
            return {
                children: [{ text: '' }],
                ...props,
                type: 'list-item-child',
            };
        },
    });
    return withListsReact(editorWithListsPlugin(editor));
};
