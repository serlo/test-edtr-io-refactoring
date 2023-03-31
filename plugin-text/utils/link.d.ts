import { Editor as SlateEditor } from 'slate';
import type { Link } from '../types';
export declare function isLinkActive(editor: SlateEditor): boolean;
export declare function getLinkElement(editor: SlateEditor): Link | undefined;
export declare function toggleLink(editor: SlateEditor): void;
