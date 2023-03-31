import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfmPlugin from 'remark-gfm';
export function useTableConfig(config) {
    const { i18n = {}, MarkdownRenderer = DefaultMarkdownRenderer } = config;
    return {
        i18n: {
            placeholder: 'Enter the table using Markdown syntax',
            ...i18n,
        },
        MarkdownRenderer,
    };
}
function DefaultMarkdownRenderer({ markdown }) {
    return <ReactMarkdown plugins={[remarkGfmPlugin]}>{markdown}</ReactMarkdown>;
}
