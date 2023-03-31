import * as React from 'react';
/** @public */
export declare const EditorInput: React.ForwardRefExoticComponent<Omit<EditorInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
/** @public */
export interface EditorInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    inputWidth?: string;
    width?: string;
}
