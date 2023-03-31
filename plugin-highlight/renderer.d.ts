/// <reference types="react" />
import { HighlightConfig } from '.';
export declare function HighlightRenderer(props: HighlightRendererProps): JSX.Element;
/** @public */
export interface HighlightRendererProps {
    config: HighlightConfig;
    code: string;
    language: string;
    showLineNumbers: boolean;
}
