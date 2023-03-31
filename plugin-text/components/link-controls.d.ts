/// <reference types="react" />
import { Editor as SlateEditor } from 'slate';
import type { TextEditorPluginConfig } from '../types';
interface LinkControlsProps {
    hasSelectionChanged: number;
    editor: SlateEditor;
    config: TextEditorPluginConfig;
    isLinkNewlyCreated: boolean;
    setIsLinkNewlyCreated: (value: boolean) => void;
}
export declare function LinkControls({ hasSelectionChanged, editor, config, isLinkNewlyCreated, setIsLinkNewlyCreated, }: LinkControlsProps): JSX.Element | null;
export {};
