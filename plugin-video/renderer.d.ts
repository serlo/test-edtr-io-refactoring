/// <reference types="react" />
import { VideoProps } from '.';
export type VideoRendererProps = VideoProps & {
    disableCursorEvents?: boolean;
};
export declare function VideoRenderer(props: VideoRendererProps): JSX.Element;
