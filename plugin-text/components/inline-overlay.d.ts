import React from 'react';
import type { TextEditorConfig } from '../types';
export declare enum InlineOverlayPosition {
    above = "above",
    below = "below"
}
export declare function InlineOverlay({ config, children, initialPosition, hidden, }: {
    config: TextEditorConfig;
    children: React.ReactNode;
    initialPosition: InlineOverlayPosition;
    hidden?: boolean;
}): JSX.Element;
