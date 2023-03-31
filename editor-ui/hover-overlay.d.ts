import * as React from 'react';
/** @public */
export interface HoverOverlayProps {
    children: React.ReactNode;
    position: 'above' | 'below';
    anchor?: React.RefObject<HTMLElement>;
}
/**
 * @param props - The {@link @edtr-io/editor-ui#HoverOverlayProps | hover overlay props}
 * @public
 */
export declare function HoverOverlay(props: HoverOverlayProps): JSX.Element;
