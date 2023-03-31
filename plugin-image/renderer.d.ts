import * as React from 'react';
import { ImageProps } from '.';
export declare class ImageRenderer extends React.Component<ImageRendererProps> {
    render(): JSX.Element;
}
export type ImageRendererProps = ImageProps & {
    disableMouseEvents?: boolean;
};
