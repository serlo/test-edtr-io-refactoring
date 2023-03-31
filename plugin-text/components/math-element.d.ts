/// <reference types="react" />
import { RenderElementProps } from 'slate-react';
import type { MathElement as MathElementType } from '../types';
export interface MathElementProps {
    element: MathElementType;
    attributes: RenderElementProps['attributes'];
    focused: boolean;
    children: RenderElementProps['children'];
}
export declare function MathElement({ element, attributes, focused, children, }: MathElementProps): JSX.Element;
