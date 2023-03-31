import { Renderer } from '../renderer';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
/**
 * @param props - The {@link @edtr-io/renderer#RendererProps | renderer props}
 * @public
 */
export function render(props) {
    const sheet = new ServerStyleSheet();
    const html = renderToString(<StyleSheetManager sheet={sheet.instance}>
      <Renderer {...props}/>
    </StyleSheetManager>);
    return {
        styles: sheet.getStyleTags(),
        html,
    };
}
