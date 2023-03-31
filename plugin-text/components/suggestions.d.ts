/// <reference types="react" />
import type { TextEditorPluginConfig } from '../types';
interface SuggestionsProps {
    config: TextEditorPluginConfig;
    options: {
        name: string;
        title?: string;
    }[];
    currentValue: string;
    selected: number;
    onMouseDown: (option: string) => void;
}
export declare const Suggestions: (props: SuggestionsProps) => JSX.Element;
export {};
