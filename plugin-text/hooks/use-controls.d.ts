import React from 'react';
import { Editor as SlateEditor } from 'slate';
import type { ControlButton, TextEditorPluginConfig } from '../types';
type SetIsLinkNewlyCreated = (value: boolean) => void;
export declare const useControls: (config: TextEditorPluginConfig, setIsLinkNewlyCreated: SetIsLinkNewlyCreated) => {
    createTextEditor: (baseEditor: SlateEditor) => import("slate").BaseEditor & import("slate-react").ReactEditor & import("@prezly/slate-lists/build/types/types").ListsEditor;
    toolbarControls: ControlButton[];
    handleHotkeys: (event: React.KeyboardEvent, editor: SlateEditor) => void;
};
export {};
