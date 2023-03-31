import * as React from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/coy';
import { useHighlightConfig } from './config';
export function HighlightRenderer(props) {
    const { i18n } = useHighlightConfig(props.config);
    return (<SyntaxHighlighter language={props.language} showLineNumbers={props.showLineNumbers} style={style} customStyle={{
            overflow: 'auto',
        }}>
      {props.code || i18n.code.label}
    </SyntaxHighlighter>);
}
