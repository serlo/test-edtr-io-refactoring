export const withLinks = (editor) => {
    const { isInline } = editor;
    editor.isInline = (element) => {
        return element.type === 'a' ? true : isInline(element);
    };
    return editor;
};
