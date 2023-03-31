import * as React from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';
/** @public */
export interface EditorTextareaProps extends Omit<TextareaAutosizeProps, 'as' | 'ref'> {
    onMoveOutRight?(): void;
    onMoveOutLeft?(): void;
}
/** @public */
export declare const EditorTextarea: React.ForwardRefExoticComponent<EditorTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
