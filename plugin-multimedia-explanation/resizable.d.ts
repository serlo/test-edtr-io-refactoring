import * as React from 'react';
/**
 * @param props - Props
 * @public
 */
export declare function Resizable(props: React.PropsWithChildren<ResizableProps>): JSX.Element;
/** @public */
export interface ResizableProps {
    className?: string;
    rowWidth: number;
    onChange?: (width: number) => void;
    onResizeEnd?: (width: number) => void;
    floating?: 'left' | 'right';
    steps: number;
    widthInSteps: number;
    responsiveBreakpoint?: number;
    enabled: boolean;
}
