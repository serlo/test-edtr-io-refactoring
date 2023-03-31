import { styled } from '../../ui';
import KaTeX from 'katex';
import React from 'react';
const KaTeXSpan = styled.span(({ element }) => {
    if (!element.inline) {
        return {
            display: 'block',
            margin: '1em 0',
            textAlign: 'center',
        };
    }
});
export function MathFormula({ element }) {
    const html = KaTeX.renderToString(`${element.inline ? '' : '\\displaystyle '}${element.src}`, {
        displayMode: false,
        throwOnError: false,
    });
    return (<KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} element={element}/>);
}
