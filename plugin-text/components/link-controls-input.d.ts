import { DeepPartial } from '../../ui';
import * as React from 'react';
import type { TextEditorPluginConfig } from '../types';
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    theme: DeepPartial<TextEditorPluginConfig['theme']>;
    label?: string;
    textfieldWidth?: string;
    editorInputWidth?: string;
}
export declare const LinkControlsInput: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export {};
