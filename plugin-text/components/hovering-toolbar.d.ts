/// <reference types="react" />
import { Editor as SlateEditor } from 'slate';
import type { TextEditorPluginConfig, ControlButton } from '../types';
export interface HoveringToolbarProps {
    editor: SlateEditor;
    config: TextEditorPluginConfig;
    controls: ControlButton[];
    text: string;
    focused: boolean;
}
export declare function HoveringToolbar(props: HoveringToolbarProps): JSX.Element;
