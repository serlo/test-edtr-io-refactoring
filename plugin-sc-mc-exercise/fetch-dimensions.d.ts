import * as React from 'react';
/** @public */
export declare class FetchDimensions extends React.Component<FetchDimensionsProps, FetchDimensionsState> {
    state: FetchDimensionsState;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    private done;
}
/** @public */
export interface FetchDimensionsProps {
    length: number;
    render: (createRef: (index: number) => (instance: HTMLElement | null) => void) => React.ReactNode;
    onDone: (dimensions: Dimensions) => void;
}
/** @public */
export interface Dimensions {
    heights: number[];
    widths: number[];
    scrollHeights: number[];
    scrollWidths: number[];
    clientHeights: number[];
    clientWidths: number[];
}
/** @public */
export interface FetchDimensionsState {
    heights: (number | null)[];
    widths: (number | null)[];
    scrollHeights: (number | null)[];
    scrollWidths: (number | null)[];
    clientHeights: (number | null)[];
    clientWidths: (number | null)[];
}
