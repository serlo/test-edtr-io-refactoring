/// <reference types="react" />
import { ImagePluginConfig } from '.';
export declare function Upload(props: UploadProps): JSX.Element;
export interface UploadProps {
    config: ImagePluginConfig;
    inOverlay?: boolean;
    onFile: (file: File) => void;
}
