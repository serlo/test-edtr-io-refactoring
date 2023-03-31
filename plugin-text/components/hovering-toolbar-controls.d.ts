/// <reference types="react" />
import { Editor as SlateEditor } from 'slate';
import type { TextEditorPluginConfig, ControlButton } from '../types';
export interface HoveringToolbarControlsProps {
    theme: TextEditorPluginConfig['theme'];
    controls: ControlButton[];
    editor: SlateEditor;
}
export declare function HoveringToolbarControls(props: HoveringToolbarControlsProps): JSX.Element | null;
