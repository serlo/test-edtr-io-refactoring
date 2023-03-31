import KaTeX from 'katex';
import * as React from 'react';
/** @public */
export const MathRenderer = React.forwardRef(function MathRenderer({ state, inline, additionalContainerProps }, ref) {
    const html = KaTeX.renderToString(getFormula(), {
        displayMode: false,
        throwOnError: false,
    });
    return (<span ref={ref} dangerouslySetInnerHTML={{ __html: html }} style={inline
            ? undefined
            : {
                display: 'block',
                margin: '1em 0',
                textAlign: 'center',
            }} {...additionalContainerProps}/>);
    function getFormula() {
        if (state === '')
            return '\\,';
        if (!inline)
            return `\\displaystyle ${state}`;
        return state;
    }
});
