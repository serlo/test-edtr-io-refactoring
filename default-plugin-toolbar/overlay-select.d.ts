/// <reference types="react" />
import { OverlaySelectProps } from '@edtr-io/plugin-toolbar';
import { DefaultPluginToolbarConfig } from './config';
export declare function createOverlaySelect(_config: DefaultPluginToolbarConfig): ({ label, options, ...props }: OverlaySelectProps) => JSX.Element;
