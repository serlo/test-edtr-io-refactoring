/// <reference types="react" />
import { EditorPluginProps } from '../../plugin';
import type { TextEditorConfig, TextEditorState } from '../types';
/** @public */
export type TextEditorProps = EditorPluginProps<TextEditorState, TextEditorConfig>;
export declare function TextEditor(props: TextEditorProps): JSX.Element;
