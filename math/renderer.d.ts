import * as React from 'react';
import { MathEditorProps } from './editor-props';
/** @public */
export type MathRendererProps = Pick<MathEditorProps, 'state' | 'inline' | 'additionalContainerProps'>;
/** @public */
export declare const MathRenderer: React.ForwardRefExoticComponent<MathRendererProps & React.RefAttributes<HTMLSpanElement>>;
