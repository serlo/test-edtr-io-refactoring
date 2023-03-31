/// <reference types="react" />
import { GeogebraProps } from '.';
export declare function GeogebraRenderer({ state, disableCursorEvents, }: GeogebraRendererProps): JSX.Element;
export type GeogebraRendererProps = GeogebraProps & {
    disableCursorEvents?: boolean;
};
