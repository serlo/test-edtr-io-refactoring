import { EditorPlugin } from '../plugin';
import type { TextEditorProps } from './components/text-editor';
import type { CustomElement, CustomText, Paragraph, OrderedList, UnorderedList, ListItem, ListItemText, Heading, Link, MathElement, TextEditorConfig, TextEditorControl, TextEditorPluginConfig, TextEditorState } from './types';
/**
 * @param config - {@link TextEditorConfig | Plugin configuration}
 * @returns The text plugin
 * @public
 */
declare const createTextPlugin: (config: TextEditorConfig) => EditorPlugin<TextEditorState, TextEditorConfig>;
export { createTextPlugin };
export type { CustomElement, Paragraph, OrderedList, UnorderedList, ListItem, ListItemText, Heading, Link, MathElement, CustomText, TextEditorConfig, TextEditorControl, TextEditorPluginConfig, TextEditorState, TextEditorProps, };
