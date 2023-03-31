/// <reference types="react" />
import { OverlayButtonProps } from '@edtr-io/plugin-toolbar';
import { DefaultPluginToolbarConfig } from './config';
export declare function createOverlayButton(config: DefaultPluginToolbarConfig): ({ children, label, ...props }: OverlayButtonProps) => JSX.Element;
